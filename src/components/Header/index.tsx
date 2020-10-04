import React from 'react';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

interface HeaderProps {
  size?: 'small' | 'large';
  isLogged?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  isLogged = true,
}: HeaderProps) => {
  const { signOut } = useAuth();

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />

        {isLogged && (
          <>
            <nav>
              <Link to="/">Listagem</Link>
              <Link to="/graphs">Gráfico</Link>
              <Link to="/import">Importar</Link>
              <Link to="/new">Adicionar</Link>

              <button type="button" onClick={signOut}>
                <FiPower />
              </button>
            </nav>
          </>
        )}
      </header>
    </Container>
  );
};

export default Header;
