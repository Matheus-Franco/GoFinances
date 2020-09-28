import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  margin-top: 24px;
  width: 100vw;

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
