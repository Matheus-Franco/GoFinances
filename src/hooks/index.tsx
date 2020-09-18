import React from 'react';

import { TransactionsProvider } from './transactionsContext';

// eslint-disable-next-line react/prop-types
const AppProvider: React.FC = ({ children }) => {
  return <TransactionsProvider>{children}</TransactionsProvider>;
};

export default AppProvider;
