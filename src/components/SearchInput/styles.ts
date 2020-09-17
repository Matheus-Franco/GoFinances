import styled, { css } from 'styled-components';
import { FiSearch } from 'react-icons/fi';

interface SearchProps {
  isFocused: boolean;
}

export const Container = styled.div<SearchProps>`
  width: 100%;
  max-width: 1120px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;

  margin: 64px 0 44px 0;

  div {
    padding: 20px 0;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #969cb2;

    ${props =>
      props.isFocused &&
      css`
        border-bottom: 2px solid #5636d3;
      `}

    svg {
      ${props =>
        props.isFocused &&
        css`
          color: #5636d3;
        `}
    }
  }
`;

export const TextInput = styled.input`
  background: transparent;
  border: none;
  padding: 0 32px;
  width: 83%;
  font-weight: normal;

  color: #5636d3;
`;

export const SearchIcon = styled(FiSearch)`
  height: 24px;
  width: 24px;
  color: #969cb2;
`;
