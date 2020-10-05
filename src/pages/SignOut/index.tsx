import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import Header from '../../components/Header';

import {
  Container,
  SignInContainer,
  Button,
  BackButtonContainer,
  BackButton,
} from './styles';
import api from '../../services/api';
import { notifyError } from '../../components/Toast';

interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignOut: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleCreateAccount = useCallback(
    async (data: ISignUpFormData) => {
      try {
        await api.post('/users', {
          name: data.name,
          email: data.email,
          password: data.password,
        });

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
