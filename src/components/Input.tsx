import { InputHTMLAttributes, useRef, useState } from 'react';
import { useField } from 'formik';

import {
  InputContainer,
  InputError,
  InputTextArea,
  UserInput,
} from '../styles/components/Input';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  value: string;
  error?: any;
}

const Input: React.FC<InputProps> = ({
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
}) => {
  const inputRef = useRef(null);
  const userInputRef = useRef(null);

  const [inputType, setInputType] = useState('text');

  return (
    <InputContainer>
      <UserInput ref={userInputRef} hasError={!!error} {...rest}>
        <InputTextArea>
          <label htmlFor={name}>{label}</label>

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
      {error && (
        <InputError>
          <h5>{error}</h5>
        </InputError>
      )}
    </InputContainer>
  );
};

export default Input;
