import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  showNavigation?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  showNavigation = true,
}: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />

      {showNavigation && (
        <nav>
          <Link to="/">Listagem</Link>
          <Link to="/graphs">Gráfico</Link>
          <Link to="/import">Importar</Link>
          <Link to="/new">Adicionar</Link>
        </nav>
      )}
    </header>
  </Container>
);

export default Header;
