export interface ITransaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  description: string;
  category: {
    title: string;
  };
  created_at: Date;
}

export type idTransactionProp = {
  id: string;
};
