import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  MutableRefObject,
  useRef,
  useState,
} from 'react';
import {
  InputContainer,
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
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  disabled = false,
  type = 'text',
  placeholder = 'Digite aqui...',
  value,
  maxLength,
  ...rest
}) => {
  const inputRef = useRef(null);

  const [inputType, setInputType] = useState('text');

  return (
    <InputContainer>
      <UserInput {...rest}>
        <InputTextArea>
          <label htmlFor={name}>{label}</label>

          <input
            ref={inputRef}
            value={value}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
          />
        </InputTextArea>
      </UserInput>
    </InputContainer>
  );
};

export default Input;
