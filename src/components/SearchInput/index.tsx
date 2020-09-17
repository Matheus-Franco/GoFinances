import React, { InputHTMLAttributes, useCallback, useState } from 'react';

import { Container, TextInput, SearchIcon } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
}

const SearchInput: React.FC<InputProps> = ({ value = '', ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container
      onFocus={handleFocused}
      onBlur={handleBlur}
      isFocused={isFocused}
    >
      <div>
        <TextInput value={value} {...rest} />
        <SearchIcon />
      </div>
    </Container>
  );
};

export default SearchInput;
