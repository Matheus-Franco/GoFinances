import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 24px;

    button {
      margin-top: 24px;
      padding: 18px;
      border-radius: 10px;
      background: #ff9000;
      border: none;
      transition: 0.4s;

      &:hover {
        background: #5636d3;
        color: #fff;
      }
    }
  }
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 36px;
  line-height: 54px;
  color: #363f5f;
  text-align: center;
`;
