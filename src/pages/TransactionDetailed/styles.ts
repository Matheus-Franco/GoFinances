import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const TableContainer = styled.section`
  table {
    width: 100%;
    border-spacing: 0 8px;

    thead {
      tr {
        th {
          color: #969cb3;
          font-weight: normal;
          padding: 20px 32px;
          text-align: left;
          font-size: 32px;
          line-height: 24px;
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 20px 32px;
          border: 0;
          font-size: 16px;
          font-weight: normal;
          color: #969cb3;

          &.income {
            color: #12a454;
          }

          &.outcome {
            color: #e83f5b;
          }

          &.title {
            color: #363f5f;
          }
        }

        td:first-child {
          border-radius: 8px 0 0 8px;
        }

        td:last-child {
          border-radius: 0 8px 8px 0;
        }
      }
    }
  }
`;

export const Description = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 20px 32px;
  font-size: 32px;
  color: #969cb3;
  font-weight: normal;

  .description-title {
    display: flex;
    align-items: center;
  }

  svg {
    margin-right: 16px;
  }

  p {
    margin-top: 8px;
    font-size: 16px;
    line-height: 24px;
    color: #363f5f;
  }
`;

export const DescriptionContent = styled.div`
  margin-top: 8px;
  color: #363f5f;
  font-size: 16px;
  font-weight: 0;
  line-height: 24px;
`;
