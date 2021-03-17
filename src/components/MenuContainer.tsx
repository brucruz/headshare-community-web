/* eslint-disable react/no-array-index-key */
import { useMemo } from 'react';
import { IconType } from 'react-icons';
import { config, useTransition } from 'react-spring';
import {
  MenuContainerLi,
  MenuGroupContainer,
  MenuGroupTitle,
  MenuHeaderContainer,
  MenuIcon,
  MenuListContainer,
} from '../styles/components/MenuContainer';
import { MenuItem, MenuItemProps } from './MenuItem';

interface MenuHeaderProps {
  title: string;
}

interface MenuGroupProps {
  title?: string;
  items: MenuItemProps[];
}

interface MenuListProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  style?: object;
  header?:
    | {
        type: 'component';
        component: JSX.Element;
      }
    | {
        type: 'default';
        title: string;
      };
  menuItems: MenuGroupProps[];
}

export interface MenuContainerProps {
  menuIcon: JSX.Element | IconType;
  isOpen: boolean;
  toggleMenu: () => void;
  header?:
    | {
        type: 'component';
        component: JSX.Element;
      }
    | {
        type: 'default';
        title: string;
      };
  menuItems: MenuGroupProps[];
}

function MenuHeader({ title }: MenuHeaderProps): JSX.Element {
  return (
    <MenuHeaderContainer>
      <h4>{title}</h4>
    </MenuHeaderContainer>
  );
}

export function MenuGroup({ title, items }: MenuGroupProps): JSX.Element {
  const menuItems = useMemo(
    () => items.map(item => <MenuItem {...item} key={item.text} />),
    [items],
  );

  return (
    <>
      {title && (
        <MenuGroupContainer>
          <MenuGroupTitle>
            <h5>{title}</h5>
          </MenuGroupTitle>
          {menuItems}
        </MenuGroupContainer>
      )}
      {!title && menuItems}
    </>
  );
}

function MenuList({ style, header, menuItems }: MenuListProps): JSX.Element {
  return (
    <MenuListContainer style={style}>
      {header && header.type === 'default' && (
        <MenuHeader title={header.title} />
      )}

      {header && header.type === 'component' && header.component}

      {menuItems.map(menuItem => (
        <MenuGroup {...menuItem} key={menuItem.title} />
      ))}
    </MenuListContainer>
  );
}

export function MenuContainer({
  menuIcon,
  header,
  menuItems,
  isOpen,
  toggleMenu,
}: MenuContainerProps): JSX.Element {
  const menuGroupTransitions = useTransition(isOpen, null, {
    initial: { opacity: 0, transform: 'translateY(-50px)' },
    from: { opacity: 0, transform: 'translateY(-50px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-50px)' },
    config: config.default,
  });

  return (
    <MenuContainerLi>
      <MenuIcon onClick={toggleMenu}>{menuIcon}</MenuIcon>

      {menuGroupTransitions.map(
        ({ item, key, props }) =>
          item && (
            <MenuList
              key={key}
              style={props}
              header={header}
              menuItems={menuItems}
            />
          ),
      )}

      {/* {isOpen && (
        <MenuList>
          {header && header.type === 'default' && (
            <MenuHeader title={header.title} />
          )}

          {header && header.type === 'component' && header.component}

          {menuItems.map(item => (
            <MenuGroup {...item} />
          ))}
        </MenuList>
      )} */}
    </MenuContainerLi>
  );
}
