import React, { useState, useEffect, useCallback } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import SearchInput from '../../components/SearchInput';

import { useTransaction } from '../../hooks/transactionsContext';
import api from '../../services/api';

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

interface SearchParamProps {
  title?: string;
}

const Dashboard: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterMatched, setFilterMatched] = useState<Transaction[]>([]);
  const history = useHistory();

  const {
    transactionsList,
    balance,
    loading,
    handleDeleteTransaction,
  } = useTransaction();

  useEffect(() => {
    async function filterSearchValue(): Promise<void> {
      const filter: SearchParamProps = {};

      if (searchValue.length > 0) {
        filter.title = searchValue;

        const matched = transactionsList.filter(
          transaction => transaction.title === searchValue,
        );

        setFilterMatched(matched);
      } else {
        filter.title = '';

        setFilterMatched([]);
      }
    }

    filterSearchValue();
  }, [searchValue, transactionsList]);

  const handleNavigateToDetail = useCallback(
    async (id: string) => {
      await api.get(`/transactions/${id}`);

      history.push(`/${id}`);
    },
    [history],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function ReturnTransactionsWithoutFilter(): any {
    return transactionsList.map(transaction => (
      <tr key={transaction.id}>
        <td>
          <button
            data-testid="navigate-to-datail"
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function ReturnFilteredTransactions(): any {
    return filterMatched.map(filter => (
      <tr key={filter.id}>
        <td>
          <button
            data-testid="navigate-to-datail"
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
