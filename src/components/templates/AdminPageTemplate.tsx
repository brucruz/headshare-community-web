import { ReactNode, MouseEvent } from 'react';
import NextLink from 'next/link';
import {
  AdminMain,
  AdminSideMenu,
  AdminTopButton,
  ContentContainer,
  AdminMainHeader,
  AdminMainHeaderTitle,
  AdminMainUpperHeader,
} from '../../styles/components/templates/AdminPageTemplate';
import Button, { ButtonProps } from '../Button';
import Footer from '../Footer';
import Header from '../Header';
import { MenuItem } from '../MenuItem';
import Tabs, { TabProps } from '../Tabs';
import { SideMenuSection } from '../SideMenuSection';

interface AdminPageTemplateProps {
  communitySlug: string;
  communityTitle: string;
  communityAuthor: string;
  pageTitle: string;
  topButton?: ButtonProps;
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
      <SideMenuSection communitySlug={communitySlug}>
        <ContentContainer>
          {/* <AdminSideMenu>
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
                  </NextLink>´
                ),
              )}
            </ul>
          </AdminSideMenu> */}

          <AdminMain>
            <AdminMainHeader>
              <AdminMainUpperHeader>
                <AdminMainHeaderTitle>
                  <h5>Gerenciar Comunidade</h5>
                  <h1>{pageTitle}</h1>
                </AdminMainHeaderTitle>

                {topButton && (
                  <AdminTopButton>
                    <Button {...topButton} size="small" />
                  </AdminTopButton>
                )}
              </AdminMainUpperHeader>

              {tabs && <Tabs tabs={tabs} />}
            </AdminMainHeader>

            {/* {topButton && (
              <AdminTopButton>
                <Button
                  text={topButton.text}
                  priority="secondary"
                  onClick={topButton.onClick}
                />
              </AdminTopButton>
            )} */}

            {children}
          </AdminMain>
        </ContentContainer>

        <Footer
          author={communityAuthor}
          communityTitle={communityTitle}
          shareable
        />
      </SideMenuSection>
    </>
  );
}
