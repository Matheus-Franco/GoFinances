import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TiDocumentText } from 'react-icons/ti';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import { ITransaction, idTransactionProp } from './index.d';

import {
  Container,
  TableContainer,
  Description,
  DescriptionContent,
} from './styles';

const TransactionDetailed: React.FC = () => {
  const { id } = useParams<idTransactionProp>();

  const [transaction, setTransaction] = useState<ITransaction>(
    {} as ITransaction,
  );

  useEffect(() => {
    async function loadTransaction(): Promise<void> {
      const response = await api.get(`transactions/${id}`);

      const transactionsFormatted = {
        ...response.data,
        formattedValue: formatValue(response.data.value),
        formattedDate: new Date(transaction.created_at).toLocaleDateString(
          'pt-br',
        ),
      };

      setTransaction(transactionsFormatted);
    }

    loadTransaction();
  }, [id, transaction.created_at]);

  return (
    <>
      <Header size="small" />

      <Container>
        {transaction ? (
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Preço</th>
                  <th>Categoria</th>
                  <th>Data</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {transaction.type === 'outcome' && ' - '}
                    {transaction.formattedValue}
                  </td>

                  {transaction.category && (
                    <td>{transaction.category.title}</td>
                  )}

                  <td>{transaction.formattedDate}</td>
                </tr>
              </tbody>
            </table>
          </TableContainer>
        ) : null}

        <Description>
          <div className="description-title">
            <TiDocumentText />
            Descrição
          </div>

          {transaction.description !== null ? (
            <DescriptionContent>{transaction.description}</DescriptionContent>
          ) : (
            <p>Você não registrou nenhuma descrição para essa transação.</p>
          )}
        </Description>
      </Container>
    </>
  );
};

export default TransactionDetailed;
