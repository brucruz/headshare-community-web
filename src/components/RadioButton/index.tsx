import { InputHTMLAttributes, useMemo, useState, ChangeEvent } from 'react';
import {
  RadioButtonGroupContainer,
  RadioButtonLabel,
  // eslint-disable-next-line import/namespace
} from '../../styles/components/RadioButton';

export interface RadioButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  index: number;
  length: number;
  label: string;
  name: string;
  selected?: string | boolean;
  value?: string;
  stretch?: boolean;
}

export interface RadioButtonGroupProps {
  elements: RadioButtonProps[];
}

export function RadioButton({
  index,
  length,
  label,
  value,
  selected,
  name,
  stretch = false,
  ...rest
}: RadioButtonProps): JSX.Element {
  const position = useMemo(() => {
    if (index === 0) {
      return 'first';
    }
    if (index === length - 1) {
      return 'last';
    }

    return 'middle';
  }, [index, length]);

  const isChecked = useMemo(() => {
    if (selected === true) {
      return true;
    }

    if (name === selected) {
      return true;
    }

    return false;
  }, [name, selected]);

  return (
    <RadioButtonLabel checked={isChecked} position={position} stretch={stretch}>
      <input
        {...rest}
        type="radio"
        checked={isChecked}
        value={value}
        name={name}
      />

      <p>{label}</p>
    </RadioButtonLabel>
  );
}

export function RadioButtonGroup({
  elements,
}: RadioButtonGroupProps): JSX.Element {
  const [buttons, setButtons] = useState(elements);

  function handleSelectButton(event: ChangeEvent<HTMLInputElement>): void {
    setButtons(old =>
      old.map(element => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { selected, ...rest } = element;
        const newElement = {
          selected: event.target.name,
          ...rest,
        };

        return newElement;
      }),
    );
  }

  return (
    <RadioButtonGroupContainer>
      {buttons.map(b => (
        <RadioButton
          index={b.index}
          length={b.length}
          label={b.label}
          value={b.value}
          selected={b.selected}
          name={b.name}
          stretch={b.stretch}
          onChange={e => handleSelectButton(e)}
        />
      ))}
    </RadioButtonGroupContainer>
  );
}
