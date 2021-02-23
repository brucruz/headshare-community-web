import { ReactNode, MouseEvent } from 'react';
import {
  AdminMain,
  AdminSideMenu,
  AdminTopButton,
  ContentContainer,
} from '../../styles/components/templates/AdminPageTemplate';
import Button from '../Button';
import Footer from '../Footer';
import Header from '../Header';
import { MenuItem } from '../MenuItem';

interface AdminPageTemplateProps {
  communitySlug: string;
  communityTitle: string;
  communityAuthor: string;
  pageTitle: string;
  topButton?: {
    text: string;
    onClick?: (event: MouseEvent<HTMLButtonElement, Event>) => void;
  };
  children: ReactNode;
}

export function AdminPageTemplate({
  communityAuthor,
  communitySlug,
  communityTitle,
  pageTitle,
  topButton,
  children,
}: AdminPageTemplateProps): JSX.Element {
  return (
    <>
      <Header communitySlug={communitySlug} communityTitle={communityTitle} />
      <div style={{ height: '56px' }} />

      <ContentContainer>
        <AdminSideMenu>
          <ul>
            <MenuItem selected text="Posts" textSize="medium" />
            <MenuItem text="Categorias" textSize="medium" />
            <MenuItem text="Configurações" textSize="medium" />
          </ul>
        </AdminSideMenu>

        <AdminMain>
          <h1>{pageTitle}</h1>

          {topButton && (
            <AdminTopButton>
              <Button
                text={topButton.text}
                priority="secondary"
                onClick={topButton.onClick}
              />
            </AdminTopButton>
          )}

          {children}
        </AdminMain>
      </ContentContainer>

      <Footer
        author={communityAuthor}
        communityTitle={communityTitle}
        shareable
      />
    </>
  );
}
