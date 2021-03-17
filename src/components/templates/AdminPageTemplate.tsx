import { ReactNode, MouseEvent } from 'react';
import NextLink from 'next/link';
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
import Tabs, { TabProps } from '../Tabs';

interface AdminPageTemplateProps {
  communitySlug: string;
  communityTitle: string;
  communityAuthor: string;
  pageTitle: string;
  topButton?: {
    text: string;
    onClick?: (event: MouseEvent<HTMLButtonElement, Event>) => void;
  };
  sideMenu: {
    title: string;
    path: string;
    selected?: boolean;
  }[];
  tabs?: TabProps[];
  children: ReactNode;
}

export function AdminPageTemplate({
  communityAuthor,
  communitySlug,
  communityTitle,
  pageTitle,
  topButton,
  sideMenu,
  tabs,
  children,
}: AdminPageTemplateProps): JSX.Element {
  return (
    <>
      <Header communitySlug={communitySlug} communityTitle={communityTitle} />
      <div style={{ height: '56px' }} />

      <ContentContainer>
        <AdminSideMenu>
          <ul>
            {sideMenu.map(item =>
              item.selected ? (
                <MenuItem
                  key={item.title}
                  selected={item.selected || false}
                  text={item.title}
                  textSize="medium"
                />
              ) : (
                <NextLink key={item.title} href={item.path}>
                  <MenuItem
                    selected={item.selected || false}
                    text={item.title}
                    textSize="medium"
                  />
                </NextLink>
              ),
            )}
          </ul>
        </AdminSideMenu>

        <AdminMain>
          <h1>{pageTitle}</h1>

          {tabs && <Tabs tabs={tabs} />}

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
