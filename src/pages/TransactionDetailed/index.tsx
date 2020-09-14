import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

import Header from '../../components/Header';

import { Container } from './styles';

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

const TransactionDetailed: React.FC = () => {
  const { id } = useParams();

  const [transaction, setTransaction] = useState<Transaction>(
    {} as Transaction,
  );

  useEffect(() => {
    async function loadTransaction(): Promise<void> {
      const response = await api.get(`transactions/${id}`);

      setTransaction(response.data);
    }

    loadTransaction();
  }, [id]);

  return (
    <>
      <Header size="large" />

      <Container>
        <h1>{transaction.title}</h1>
      </Container>
    </>
  );
};

export default TransactionDetailed;
