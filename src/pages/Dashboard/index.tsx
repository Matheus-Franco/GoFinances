import React, { useState, useEffect, useCallback } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import Header from '../../components/Header';
import Loading from '../../components/Loading';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import { IBalance, ITransaction } from './index.d';

import { Container, CardContainer, Card, TableContainer } from './styles';

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState([] as Array<ITransaction>);
  const [balance, setBalance] = useState<IBalance>({} as IBalance);
  const [loading, setLoading] = useState<boolean>(true);

  const history = useHistory();

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const data = await api.get('/transactions/my');

      const response = data.data;

      const transactionsFormatted = response.transactions.map(
        (transaction: ITransaction) => ({
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
  }, [transactions]);

  const handleNavigateToDetail = useCallback(
    async (id: string) => {
      await api.get(`/transactions/${id}`);

      history.push(`/${id}`);
    },
    [history],
  );

  const handleDeleteTransaction = useCallback(
    async (id: string) => {
      await api.delete(`/transactions/${id}`);
      const response = await api.get('/transactions/my');

      const updatedTransactions = transactions.filter(
        transaction => transaction.id !== id,
      );

      const updatedBalance = {
        income: formatValue(response.data.balance.income),
        outcome: formatValue(response.data.balance.outcome),
        total: formatValue(response.data.balance.total),
      };

      setTransactions(updatedTransactions);
      setBalance(updatedBalance);
    },
    [transactions],
  );

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
                {transactions.map(transaction => (
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
                ))}
              </tbody>
            </table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
