import React from 'react';

import DoughnutChart from '../../components/DoughnutChart';
import Header from '../../components/Header';

import { Container } from './styles';

const Chart: React.FC = () => {
  return (
    <>
      <Header size="small" />

      <Container>
        <DoughnutChart />
      </Container>
    </>
  );
};

export default Chart;
