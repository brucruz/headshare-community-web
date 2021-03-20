import { TextareaHTMLAttributes, useEffect, useRef, useState } from 'react';

import {
  TextAreaContainer,
  TextAreaError,
  TextAreaMaxLength,
  TextAreaArea,
  UserTextArea,
} from '../styles/components/TextArea';

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  value: string;
  error?: any;
}

export function TextArea({
  id,
  name,
  label,
  disabled = false,
  placeholder = 'Digite aqui...',
  value,
  maxLength,
  error,
  ...rest
}: TextAreaProps): JSX.Element {
  const inputRef = useRef(null);
  const userTextAreaRef = useRef(null);

  const [characterLimit, setCharacterLimit] = useState(maxLength);

  useEffect(() => {
    maxLength && setCharacterLimit(maxLength - value.length);
  }, [value, maxLength]);

  return (
    <TextAreaContainer>
      <UserTextArea ref={userTextAreaRef} hasError={!!error} {...rest}>
        <TextAreaArea>
          {label && <label htmlFor={name}>{label}</label>}

          <textarea
            id={id}
            name={name}
            ref={inputRef}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
          />
        </TextAreaArea>
      </UserTextArea>
      {maxLength && (
        <TextAreaMaxLength>
          <h5>{characterLimit}</h5>
        </TextAreaMaxLength>
      )}
      {error && (
        <TextAreaError>
          <h5>{error}</h5>
        </TextAreaError>
      )}
    </TextAreaContainer>
  );
}
