import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';

import {
  InputContainer,
  InputError,
  InputMaxLength,
  InputTextArea,
  UserInput,
} from '../../styles/components/Input';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  value: string;
  error?: any;
}

function Input({
  id,
  name,
  label,
  disabled = false,
  type = 'text',
  placeholder = 'Digite aqui...',
  value,
  maxLength,
  error,
  ...rest
}: InputProps): JSX.Element {
  const inputRef = useRef(null);
  const userInputRef = useRef(null);

  const [characterLimit, setCharacterLimit] = useState(maxLength);

  useEffect(() => {
    maxLength && setCharacterLimit(maxLength - value.length);
  }, [value, maxLength]);

  return (
    <InputContainer>
      <UserInput ref={userInputRef} hasError={!!error} {...rest}>
        <InputTextArea>
          {label && <label htmlFor={name}>{label}</label>}

          <input
            id={id}
            name={name}
            ref={inputRef}
            value={value}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
          />
        </InputTextArea>
      </UserInput>
      {maxLength && (
        <InputMaxLength>
          <h5>{characterLimit}</h5>
        </InputMaxLength>
      )}
      {error && (
        <InputError>
          <h5>{error}</h5>
        </InputError>
      )}
    </InputContainer>
  );
}

export default Input;
