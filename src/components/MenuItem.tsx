import NextLink from 'next/link';
import { LiHTMLAttributes, useMemo } from 'react';
import { MenuItemContainer } from '../styles/components/MenuItem';

export interface MenuItemProps extends LiHTMLAttributes<HTMLLIElement> {
  text: string;
  selected?: boolean;
  href?: string;
  textSize?: 'small' | 'medium';
}

export function MenuItem({
  text,
  selected = false,
  href,
  textSize = 'small',
  onClick,
}: MenuItemProps): JSX.Element {
  const itemText = useMemo(() => {
    switch (textSize) {
      case 'medium':
        return <h4>{text}</h4>;

      default:
        return <p>{text}</p>;
    }
  }, [text, textSize]);

  return (
    <MenuItemContainer selected={selected} onClick={onClick}>
      {href && <NextLink href={href}>{itemText}</NextLink>}

      {!href && itemText}
    </MenuItemContainer>
  );
}
