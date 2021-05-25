/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line no-use-before-define
import React, { InputHTMLAttributes } from 'react';

import {
  Container,
  SwitchInput,
  SwitchLabel,
  SwitchButton,
} from '../styles/components/Switch';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  isOn: boolean;
  handleToggle(): void;
}

const Switch: React.FC<SwitchProps> = ({ id, isOn, handleToggle }) => {
  'hello';

  return (
    <Container>
      <SwitchInput
        checked={isOn}
        onChange={handleToggle}
        id={id}
        type="checkbox"
      />
      {!isOn ? (
        <SwitchLabel htmlFor={id} isOn={isOn}>
          <SwitchButton />
        </SwitchLabel>
      ) : (
        <SwitchLabel htmlFor={id} isOn={isOn}>
          <SwitchButton />
        </SwitchLabel>
      )}
    </Container>
  );
};

export default Switch;
