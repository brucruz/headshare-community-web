import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import {
  ContentSection,
  SideMenuContainer,
} from '../styles/components/SideMenuSection';
import { MenuGroup } from './MenuContainer';

interface SideMenuProps {
  communitySlug: string;
  children: ReactNode;
}

export function SideMenuSection({
  communitySlug,
  children,
}: SideMenuProps): JSX.Element {
  const router = useRouter();

  return (
    <ContentSection>
      <SideMenuContainer>
        <MenuGroup
          items={[
            {
              text: 'Home',
              href: `/${communitySlug}`,
              selected: router.asPath === `/${communitySlug}`,
            },
            {
              text: 'Posts',
              href: `/${communitySlug}/posts`,
              selected: router.asPath === `/${communitySlug}/posts`,
              disabled: true,
            },
            {
              text: 'Categorias',
              href: `/${communitySlug}/categories`,
              selected: router.asPath === `/${communitySlug}/categories`,
            },
            {
              text: 'Membros',
              href: `/${communitySlug}/members`,
              selected: router.asPath === `/${communitySlug}/members`,
              disabled: true,
            },
            {
              text: 'Sobre',
              href: `/${communitySlug}/about`,
              selected: router.asPath === `/${communitySlug}/about`,
              disabled: true,
            },
          ]}
        />
      </SideMenuContainer>

      {children}
    </ContentSection>
  );
}
