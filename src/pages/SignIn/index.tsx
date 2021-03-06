import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory, Link } from 'react-router-dom';
import * as Yup from 'yup';

import Header from '../../components/Header';
import Input from '../../components/Input';

import { useAuth } from '../../hooks/auth';
import { ISignInCredentials } from './index.d';

import {
  Container,
  SignInContainer,
  Button,
  CreateAccountContainer,
} from './styles';

import { notifyError } from '../../components/Toast';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();

  const history = useHistory();

  const authenticateSignIn = useCallback(
    async (credentials: ISignInCredentials) => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório.')
            .email('Digite um e-mail válido.'),
          password: Yup.string().required('Senha obrigatória.'),
        });

        await schema.validate(credentials, {
          abortEarly: false,
        });

        await signIn({
          email: credentials.email,
          password: credentials.password,
        });

        history.push('/dashboard');
      } catch (err) {
        notifyError();
      }
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
              <Input type="password" name="password" />
            </div>
            <Button type="submit">Entrar</Button>
          </Form>
        </SignInContainer>

        <CreateAccountContainer>
          <p>Não possui uma conta?</p>
          <Link to="/signout">Faça parte do nosso time clicando aqui</Link>
        </CreateAccountContainer>
      </Container>
    </>
  );
};

export default SignIn;
