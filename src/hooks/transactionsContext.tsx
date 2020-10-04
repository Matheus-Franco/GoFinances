import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import api from '../services/api';
import formatValue from '../utils/formatValue';

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

interface TransactionsContextData {
  transactionsList: Transaction[];
  balance: Balance;
  loading: boolean;
  handleDeleteTransaction(id: string): Promise<void>;
}

const AuthContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
);

export const TransactionsProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState([] as Array<Transaction>);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const data = await api.get('/transactions/my');

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
    <AuthContext.Provider
      value={{
        transactionsList: transactions,
        balance,
        loading,
        handleDeleteTransaction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useTransaction(): TransactionsContextData {
  const context = useContext(AuthContext);

  return context;
}
