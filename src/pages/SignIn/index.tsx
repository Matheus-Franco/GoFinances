import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Input from '../../components/Input';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  SignInContainer,
  Button,
  CreateAccountContainer,
} from './styles';

interface ISignInCredentials {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();

  const history = useHistory();

  const authenticateSignIn = useCallback(
    async (credentials: ISignInCredentials) => {
      await signIn({
        email: credentials.email,
        password: credentials.password,
      });

      history.push('/dashboard');
    },
    [signIn, history],
  );

  return (
    <>
      <Header size="small" isLogged={false} />

      <Container>
        <SignInContainer>
          <Form ref={formRef} onSubmit={authenticateSignIn}>
            <div>
              <p>E-mail</p>
              <Input name="email" />
            </div>
            <div>
              <p>Senha</p>
              <Input name="password" />
            </div>
            <Button type="submit">Entrar</Button>
          </Form>
        </SignInContainer>

        <CreateAccountContainer>
          <p>Não possui uma conta?</p>
          <a href="#">Faça parte do nosso time clicando aqui</a>
        </CreateAccountContainer>
      </Container>
    </>
  );
};

export default SignIn;
