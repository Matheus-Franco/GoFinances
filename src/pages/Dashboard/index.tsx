import React, { useState, useEffect, useCallback } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { useHistory } from 'react-router-dom';
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import SearchInput from '../../components/SearchInput';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

interface SearchParamProps {
  title?: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchValue, setSearchValue] = useState<string>('');
  const [filterMatched, setFilterMatched] = useState<Transaction[]>([]);

  const history = useHistory();

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const data = await api.get('/transactions');

      const response = data.data;

      const transactionsFormatted = response.transactions.map(
        (transaction: Transaction) => ({
          ...transaction,
          formattedValue: formatValue(transaction.value),
          formattedDate: new Date(transaction.created_at).toLocaleDateString(
            'pt-br',
          ),
        }),
      );

      const balanceFormatted = {
        income: formatValue(response.balance.income),
        outcome: formatValue(response.balance.outcome),
        total: formatValue(response.balance.total),
      };

      setLoading(false);
      setTransactions(transactionsFormatted);
      setBalance(balanceFormatted);
    }

    loadTransactions();
  }, []);

  useEffect(() => {
    async function filterSearchValue(): Promise<void> {
      const filter: SearchParamProps = {};

      if (searchValue.length > 0) {
        filter.title = searchValue;

        const matched = transactions.filter(
          transaction => transaction.title === searchValue,
        );

        setFilterMatched(matched);
      } else {
        filter.title = '';

        setFilterMatched([]);
      }
    }

    filterSearchValue();
  }, [searchValue, transactions]);

  const handleDeleteTransaction = useCallback(
    async (id: string) => {
      await api.delete(`/transactions/${id}`);

      const updatedTransactions = transactions.filter(
        transaction => transaction.id !== id,
      );

      setTransactions(updatedTransactions);
    },
    [transactions],
  );

  const handleNavigateToDetail = useCallback(
    async (id: string) => {
      await api.get(`/transactions/${id}`);

      history.push(`/${id}`);
    },
    [history],
  );

  function ReturnTransactionsWithoutFilter(): any {
    return transactions.map(transaction => (
      <tr key={transaction.id}>
        <td>
          <button
            type="button"
            className="title"
            onClick={() => handleNavigateToDetail(transaction.id)}
          >
            {transaction.title}
          </button>
        </td>

        <td className={transaction.type}>
          {transaction.type === 'outcome' && ' - '}
          {transaction.formattedValue}
        </td>

        <td>{transaction.category.title}</td>
        <td>{transaction.formattedDate}</td>

        <td>
          <button
            onClick={() => handleDeleteTransaction(transaction.id)}
            type="button"
          >
            <FaTrashAlt />
          </button>
        </td>
      </tr>
    ));
  }

  function ReturnFilteredTransactions(): any {
    return filterMatched.map(filter => (
      <tr key={filter.id}>
        <td>
          <button
            type="button"
            className="title"
            onClick={() => handleNavigateToDetail(filter.id)}
          >
            {filter.title}
          </button>
        </td>

        <td className={filter.type}>
          {filter.type === 'outcome' && ' - '}
          {filter.formattedValue}
        </td>

        <td>{filter.category.title}</td>
        <td>{filter.formattedDate}</td>

        <td>
          <button
            onClick={() => handleDeleteTransaction(filter.id)}
            type="button"
          >
            <FaTrashAlt />
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <>
      <Header />

      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <SearchInput
          placeholder="Título da transação"
          value={searchValue}
          onChange={text => setSearchValue(text.target.value)}
        />

        {loading ? (
          <Loading />
        ) : (
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Preço</th>
                  <th>Categoria</th>
                  <th>Data</th>
                </tr>
              </thead>

              <tbody>
                {filterMatched.length < 1 ? (
                  <ReturnTransactionsWithoutFilter />
                ) : (
                  <ReturnFilteredTransactions />
                )}
              </tbody>
            </table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
