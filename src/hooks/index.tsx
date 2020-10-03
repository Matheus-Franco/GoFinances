import React from 'react';

import { TransactionsProvider } from './transactionsContext';
import { AuthProvider } from './auth';

// eslint-disable-next-line react/prop-types
const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <TransactionsProvider>{children}</TransactionsProvider>
    </AuthProvider>
  );
};

export default AppProvider;
