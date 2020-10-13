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
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  margin-top: 24px;
  width: 100vw;

  animation: ${appearFromLeft} 1s;

  div {
    margin-top: 48px;
    text-align: center;
    background: #fff;
    width: 400px;
    padding: 16px;
    border-radius: 8px;

    p {
      color: #363f5f;
    }
  }
`;
