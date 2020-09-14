import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useHistory, Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import Header from '../../components/Header';
import Input from '../../components/Input';

import { Container, Title } from './styles';

interface SignUpFormData {
  title: string;
  value: number;
  category: string;
  type: string;
  description: string;
}

const New: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const notifySucess = useCallback((): void => {
    toast.success('Transação adicionada com sucesso!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []);

  const notifyError = useCallback((): void => {
    toast.error('Preencha todos os campos!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Campo obrigatório.'),
          value: Yup.string().required('Campo obrigatório.'),
          category: Yup.string().required('Campo obrigatório.'),
          type: Yup.string().required('Campo obrigatório.'),
          description: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/transactions', data);

        history.push('/');

        notifySucess();
      } catch (err) {
        notifyError();

        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    },
    [history, notifySucess, notifyError],
  );

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
          <Input
            icon={AiFillCheckCircle}
            name="description"
            placeholder="Descrição (não obrigatório)"
          />
          <Input icon={AiFillCheckCircle} name="type" placeholder="Tipo" />

          <div>
            <button type="button">
              <Link to="/">Cancelar</Link>
            </button>
            <button type="submit">Salvar</button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default New;
