import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';
import Input from '../../components/Input';

import { Container, Title } from './styles';

interface SignUpFormData {
  title: string;
  value: number;
  category: string;
  type: string;
}

const New: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        value: Yup.number().required(),
        category: Yup.string().required(),
        type: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/transactions', data);

      history.push('/');
    } catch (err) {
      alert('Preencha todos os campos.');
    }
  }, []);

  return (
    <>
      <Header size="small" />

      <Container>
        <Title>Adicionar uma transação</Title>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input icon={AiFillCheckCircle} name="title" placeholder="Título" />
          <Input icon={AiFillCheckCircle} name="value" placeholder="Preço" />
          <Input
            icon={AiFillCheckCircle}
            name="category"
            placeholder="Categoria"
          />
          <Input icon={AiFillCheckCircle} name="type" placeholder="Tipo" />

          <button type="submit">Salvar</button>
        </Form>
      </Container>
    </>
  );
};

export default New;
