import { ButtonHTMLAttributes } from 'react';
import { ButtonContainer } from '../styles/components/Button';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  priority?: 'primary' | 'secondary' | 'tertiary';
  text: string | any[];
  size?: 'medium' | 'small';
  icon?: any;
  stretch?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  priority = 'primary',
  text,
  stretch = false,
  disabled = false,
  size = 'medium',
  icon,
  isLoading = false,
  ...rest
}) => (
  <ButtonContainer
    disabled={disabled}
    priority={priority}
    stretch={stretch}
    size={size}
    isLoading={isLoading}
    {...rest}
  >
    {icon && icon}
    {size === 'small' ? <p>{text}</p> : <h4>{text}</h4>}
  </ButtonContainer>
);

export default Button;
