import { InputHTMLAttributes } from 'react';

import {
  Container,
  SwitchInput,
  SwitchLabel,
  SwitchButton,
} from '../../styles/components/Switch';

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  isOn: boolean;
  handleToggle(): void;
}

export default function Switch({
  id,
  isOn,
  handleToggle,
}: SwitchProps): JSX.Element {
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
}
