import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import NextImage from 'next/image';

import {
  InputContainer,
  InputCreditCardBrand,
  InputError,
  InputMaxLength,
  InputTextArea,
  UserInput,
} from '../../styles/components/Input';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  mask?: string;
  placeholder?: string;
  maskPlaceholder?: string | null;
  maskChar?: string | null;
  // eslint-disable-next-line @typescript-eslint/ban-types
  formatChars?: object;
  disabled?: boolean;
  type?: string;
  value: string;
  error?: any;
  creditCardBrand?: string;
}

function Input({
  id,
  name,
  label,
  mask = '',
  disabled = false,
  type = 'text',
  placeholder = 'Digite aqui...',
  maskPlaceholder,
  maskChar = null,
  formatChars,
  value,
  maxLength,
  error,
  creditCardBrand,
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

          <ReactInputMask
            id={id}
            name={name}
            mask={mask}
            maskPlaceholder={maskPlaceholder}
            ref={inputRef}
            value={value}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            maskChar={maskChar}
            formatChars={formatChars}
          />
        </InputTextArea>

        {creditCardBrand && (
          <InputCreditCardBrand>
            <NextImage src={creditCardBrand} width={26} height={26} />
          </InputCreditCardBrand>
        )}
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
