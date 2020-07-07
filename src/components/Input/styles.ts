import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface InputProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<InputProps>`
  background: #fff;
  border-radius: 10px;
  border: 2px solid white;
  padding: 16px;
  width: 100%;
  color: #666360;
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
      color: #ff9000;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: gray;
    &::placholder {
      color: #666360;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  margin-left: 16px;

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
