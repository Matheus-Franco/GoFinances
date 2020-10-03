import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthState {
  user: IUser;
  token: string;
}

interface IAuthContextData {
  user: IUser;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const user = localStorage.getItem('@GoFinances:user');
    const token = localStorage.getItem('@GoFinances:token');

    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password });

    const { user, token } = response.data;

    localStorage.setItem('@GoFinances:user', JSON.stringify(user));
    localStorage.setItem('@GoFinances:token', token);

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoFinances:user');
    localStorage.removeItem('@GoFinances:token');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  return context;
}
