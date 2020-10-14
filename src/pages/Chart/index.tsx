import React from 'react';

import DoughnutChart from '../../components/DoughnutChart';
import Header from '../../components/Header';

import { Container, TitleChart, ContentWrapper } from './styles';

const Chart: React.FC = () => {
  return (
    <>
      <Header size="small" />

      <Container>
        <TitleChart>Gráfico de entradas e saídas</TitleChart>

        <ContentWrapper>
          <DoughnutChart />
        </ContentWrapper>
      </Container>
    </>
  );
};

export default Chart;
