import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Header from '../../components/Header';

import { ISignUpFormData } from './index.d';

import {
  Container,
  SignInContainer,
  Button,
  BackButtonContainer,
} from './styles';
import api from '../../services/api';
import { notifyError } from '../../components/Toast';

const SignOut: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleCreateAccount = useCallback(
    async (data: ISignUpFormData) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório.'),
          email: Yup.string()
            .required('E-mail é obrigatório.')
            .email('Digite um e-mail válido.'),
          password: Yup.string().required('Senha é obrigatória.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');
      } catch (err) {
        notifyError();
      }
    },
    [history],
  );

  return (
    <>
      <Header size="small" isLogged={false} />

      <Container>
        <SignInContainer>
          <Form ref={formRef} onSubmit={handleCreateAccount}>
            <div>
              <p>Nome de usuário</p>
              <Input name="name" />
            </div>
            <div>
              <p>E-mail</p>
              <Input name="email" />
            </div>
            <div>
              <p>Senha</p>
              <Input type="password" name="password" />
            </div>

            <Button type="submit">Cadastrar</Button>
          </Form>
        </SignInContainer>

        <BackButtonContainer>
          <Link to="/">Voltar para página principal</Link>
        </BackButtonContainer>
      </Container>
    </>
  );
};

export default SignOut;
