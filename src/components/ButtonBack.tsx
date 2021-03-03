import Image from 'next/image';
import { ButtonHTMLAttributes, ReactElement } from 'react';
import { ButtonBackContainer } from '../styles/components/ButtonBack';

const ButtonBack = ({
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>): ReactElement => (
  <ButtonBackContainer data-testid="button-back-atom" {...rest}>
    <Image
      src="https://headshare.s3.amazonaws.com/assets/arrow_left.png"
      width={35}
      height={35}
    />
  </ButtonBackContainer>
);

export default ButtonBack;
