import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

import { Container } from './styles';

const Loading: React.FC = () => (
  <Container>
    <AiOutlineLoading color="#5636d3" size={48} />
  </Container>
);

export default Loading;
