import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const SignInContainer = styled.div`
  background: #e7e7e7;
  padding: 32px;
  width: 50%;
  border-radius: 8px;
  margin-bottom: 48px;

  p {
    margin-bottom: 4px;
  }

  div {
    margin-bottom: 16px;

    & + div {
      margin-bottom: 40px;
    }
  }
`;

export const Button = styled.button`
  width: 100%;
  border-radius: 10px;
  border: none;
  padding: 16px;

  background: #ff872c;
  color: #fff;
`;

export const CreateAccountContainer = styled.div`
  padding: 32px;
  width: 50%;
  border-radius: 8px;

  text-align: center;

  a {
    color: #5636d3;
  }
`;
