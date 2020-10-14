import styled, { keyframes } from 'styled-components';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  } to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  max-width: 1120px;

  animation: ${appearFromLeft} 1s;
`;

export const TitleChart = styled.div`
  color: #969cb2;
  font-size: 32px;
  border-radius: 8px;
  padding: 16px;
`;

export const ContentWrapper = styled.div`
  padding: 16px;
  width: 100%;

  canvas {
    width: 200px;
    height: 200px;
  }

  div {
    margin-top: 32px;
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    color: #363f5f;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
