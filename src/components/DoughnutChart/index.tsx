import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import api from '../../services/api';

import IBalance from './index.d';

const DoughnutChart: React.FC = () => {
  const [balance, setBalance] = useState<IBalance>({} as IBalance);

  useEffect(() => {
    async function loadBalance(): Promise<void> {
      const response = await api.get('/transactions/my');

      const updatedBalance = {
        income: response.data.balance.income,
        outcome: response.data.balance.outcome,
      };

      setBalance(updatedBalance);
    }

    loadBalance();
  }, []);

  const data = {
    labels: ['Entradas', 'Saídas'],
    datasets: [
      {
        data: [balance.income, balance.outcome],
        backgroundColor: ['#12a454', '#e83f5b'],
        hoverBackgroundColor: ['#12a454', '#e83f5b'],
      },
    ],
  };

  return (
    <>
      <Doughnut data={data} height={120} />

      {balance.income > balance.outcome ? (
        <PositiveBalance />
      ) : (
        <NegativeBalance />
      )}
    </>
  );
};

const PositiveBalance = (): JSX.Element => {
  return (
    <div>
      <p>Suas finanças estão controladas, continue assim!</p>
    </div>
  );
};

const NegativeBalance = (): JSX.Element => {
  return (
    <div>
      <p>Suas finanças não estão seguras, reveja seus gastos!</p>
    </div>
  );
};

export default DoughnutChart;
