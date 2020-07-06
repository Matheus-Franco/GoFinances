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

    div {
      display: flex;
      justify-content: flex-end;

      button {
        margin-top: 24px;
        margin-left: 18px;
        width: 224px;
        transition: 0.4s;
        display: flex;
        align-items: center;
        justify-content: center;

        background: #ff872c;
        color: #fff;
        border-radius: 5px;
        padding: 15px 80px;
        border: 0;

        &:hover {
          background: #5636d3;
          color: #fff;
        }

        a {
          text-decoration: none;
          color: #fff;
        }
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
