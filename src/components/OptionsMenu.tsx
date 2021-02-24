import { useState } from 'react';
import {
  OptionsHoverMenu,
  OptionsMenuButton,
  OptionsMenuCircle,
  OptionsMenuContainer,
} from '../styles/components/OptionsMenu';
import { MenuItem, MenuItemProps } from './MenuItem';

interface OptionsMenuProps {
  menuItems: MenuItemProps[];
}

export function OptionsMenu({ menuItems }: OptionsMenuProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <OptionsMenuContainer>
      <OptionsMenuButton onClick={() => setIsOpen(!isOpen)}>
        <OptionsMenuCircle />
        <OptionsMenuCircle />
        <OptionsMenuCircle />
      </OptionsMenuButton>

      {isOpen && (
        <OptionsHoverMenu>
          <ul>
            {menuItems.map(menuItem => (
              <MenuItem
                key={menuItem.text}
                text={menuItem.text}
                selected={menuItem.selected}
                textSize="small"
                href={menuItem.href}
                onClick={menuItem.onClick}
              />
            ))}
          </ul>
        </OptionsHoverMenu>
      )}
    </OptionsMenuContainer>
  );
}
