import { InputHTMLAttributes } from 'react';
import { Base, TextContainer } from '../../styles/components/RadioInput';

export interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  isChecked?: boolean;
  value?: string;
  description?: string;
}

export function RadioInput({
  label,
  value,
  isChecked,
  name,
  description,
  ...rest
}: RadioInputProps): JSX.Element {
  return (
    <Base data-testid="radio-button-atom">
      <TextContainer isChecked={isChecked}>
        <span className="text">{label}</span>
        {description && <span>{description}</span>}
      </TextContainer>
      <input
        {...rest}
        type="radio"
        checked={isChecked}
        value={value}
        name={name}
      />
      <span className="shadow">
        <span className="checkmark">
          <span />
        </span>
      </span>
    </Base>
  );
}
