/* eslint-disable no-underscore-dangle */
import { useCallback, useEffect, useMemo, useState } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import { MdAddCircle, MdMenu, MdPerson } from 'react-icons/md';
import { config, useTransition } from 'react-spring';
import {
  HeaderContainer,
  HeaderContent,
  LogoContainer,
  HamburguerContainer,
  CommunityTitle,
  MenuIcons,
  HoverSideMenu,
  PostSaveStatus,
  UserMenuHeader,
  UserMenuHeaderAvatar,
  UserMenuHeaderInfo,
  UserMenuIcon,
  AddMenuIcon,
  UserMenuHeaderAvatarContent,
  HoverSideMenuContainer,
} from '../styles/components/Header';
import {
  useHeaderMeQuery,
  useLogoutMutation,
  RoleOptions,
  useCreatePostMutation,
} from '../generated/graphql';
import { isServer } from '../utils/isServer';
import AuthModal from './AuthModal';
import { useAuth, AuthType } from '../hooks/useAuth';
import { MenuContainer, MenuContainerProps, MenuGroup } from './MenuContainer';

interface HeaderProps {
  communityTitle: string;
  communitySlug: string;
  editorMode?: 'saving' | 'saved';
}

const Header: React.FC<HeaderProps> = ({
  communityTitle,
  communitySlug,
  editorMode,
}) => {
  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);
  const [addMenuIsOpen, setAddMenuIsOpen] = useState(false);
  const {
    isCreator,
    setIsCreator,
    setIsMember,
    me,
    setMe,
    setIsFollower,
  } = useAuth();

  const { openAuth } = useAuth();
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [logout] = useLogoutMutation();
  const [createPost] = useCreatePostMutation();

  const { data: userData } = useHeaderMeQuery({
    skip: isServer(),
  });

  useEffect(() => {
    if (userData) {
      if (userData.me) {
        if (userData.me.user) {
          setMe(userData.me.user);

          const commRole = userData.me.user.roles.find(
            role => role.community.slug === communitySlug,
          )?.role;

          if (commRole === RoleOptions.Creator) {
            setIsCreator(true);
            setIsMember(false);
            setIsFollower(false);
          } else if (commRole === RoleOptions.Member) {
            setIsCreator(false);
            setIsMember(true);
            setIsFollower(false);
          } else if (commRole === RoleOptions.Follower) {
            setIsCreator(false);
            setIsMember(false);
            setIsFollower(true);
          } else {
            setIsCreator(false);
            setIsMember(false);
            setIsFollower(false);
          }
        }
      }
    }
  }, [
    userData,
    communitySlug,
    setMe,
    setIsCreator,
    setIsMember,
    setIsFollower,
  ]);

  const handleLogout = useCallback(async () => {
    logout();
    await apolloClient.resetStore();
    setMe(undefined);

    if (router.pathname === '/[communitySlug]') {
      router.reload();
    } else {
      router.push(`/${communitySlug}`);
    }
  }, [router, apolloClient, logout, communitySlug, setMe]);

  const handleNewPost = useCallback(async () => {
    const result = await createPost({
      variables: {
        communitySlug,
        post: {},
      },
    });

    if (result.data) {
      if (result.data.createPost.post) {
        const id = result.data?.createPost.post?._id;

        router.push(`/${communitySlug}/draft?id=${id.toString()}`);
      }
    }
  }, [createPost, router, communitySlug]);

  const editorSaveState = useMemo((): JSX.Element | undefined => {
    if (editorMode === 'saved') {
      return (
        <PostSaveStatus>
          <h5>Salvo</h5>
        </PostSaveStatus>
      );
    }

    if (editorMode === 'saving') {
      return (
        <PostSaveStatus>
          <h5>Salvando</h5>
        </PostSaveStatus>
      );
    }

    return undefined;
  }, [editorMode]);

  const handleToggleSideMenu = useCallback(() => {
    setSideMenuIsOpen(!sideMenuIsOpen);
  }, [sideMenuIsOpen]);

  const handleToggleUserMenu = useCallback(() => {
    setUserMenuIsOpen(!userMenuIsOpen);
  }, [userMenuIsOpen]);

  const handleToggleAddMenu = useCallback(() => {
    setAddMenuIsOpen(!addMenuIsOpen);
  }, [addMenuIsOpen]);

  const openAuthModal = useCallback(
    (state?: AuthType) => {
      setUserMenuIsOpen(false);

      openAuth(state);
    },
    [openAuth],
  );

  const userMenuHeader = useMemo(
    () => (
      <UserMenuHeader>
        <UserMenuHeaderAvatar>
          {me?.avatar ? (
            <UserMenuHeaderAvatarContent>
              <img
                src={me.avatar}
                alt={`${me?.name} ${me?.surname && me.surname}`}
              />
            </UserMenuHeaderAvatarContent>
          ) : (
            <MdPerson />
          )}
        </UserMenuHeaderAvatar>

        <UserMenuHeaderInfo>
          <h4>
            {me?.name} {me?.surname && me.surname}
          </h4>
          <h5>{me?.email}</h5>
        </UserMenuHeaderInfo>
      </UserMenuHeader>
    ),
    [me],
  );

  const userMenuContent = useMemo((): MenuContainerProps => {
    const menuIcon = (
      <UserMenuIcon>
        <MdPerson />
      </UserMenuIcon>
    );

    if (!me) {
      return {
        isOpen: userMenuIsOpen,
        toggleMenu: handleToggleUserMenu,
        menuIcon,
        menuItems: [
          {
            items: [
              {
                text: 'Entrar',
                onClick: () => openAuthModal('login'),
              },
              {
                text: 'Cadastrar',
                onClick: () => openAuthModal('register'),
              },
            ],
          },
        ],
      };
    }

    if (isCreator) {
      return {
        isOpen: userMenuIsOpen,
        toggleMenu: handleToggleUserMenu,
        menuIcon,
        header: {
          type: 'component',
          component: userMenuHeader,
        },
        menuItems: [
          {
            title: 'Gerenciar Comunidade',
            items: [
              {
                text: 'Dashboard',
                href: '/',
                disabled: true,
              },
              {
                text: 'Posts',
                href: `/${communitySlug}/admin/posts`,
              },
              {
                text: 'Categorias',
                href: `/${communitySlug}/admin/categories`,
              },
              {
                text: 'Configurações',
                href: `/${communitySlug}/admin/config`,
              },
            ],
          },
          {
            title: 'Conta Pessoal',
            items: [
              {
                text: 'Meu Perfil',
                href: '/',
                disabled: true,
              },
              {
                text: 'Minhas Comunidades',
                href: '/',
                disabled: true,
              },
            ],
          },
          {
            items: [
              {
                text: 'Logout',
                onClick: handleLogout,
              },
            ],
          },
        ],
      };
    }

    return {
      isOpen: userMenuIsOpen,
      toggleMenu: handleToggleUserMenu,
      menuIcon,
      header: {
        type: 'component',
        component: userMenuHeader,
      },
      menuItems: [
        {
          items: [
            {
              text: 'Meu Perfil',
              href: '/',
              disabled: true,
            },
            {
              text: 'Minhas Comunidades',
              href: '/',
              disabled: true,
            },
          ],
        },
        {
          items: [
            {
              text: 'Logout',
              onClick: handleLogout,
            },
          ],
        },
      ],
    };
  }, [
    communitySlug,
    handleLogout,
    handleToggleUserMenu,
    me,
    openAuthModal,
    userMenuHeader,
    userMenuIsOpen,
    isCreator,
  ]);

  const addMenuIcon = useMemo(
    () =>
      isCreator && (
        <AddMenuIcon>
          <MdAddCircle />
        </AddMenuIcon>
      ),
    [isCreator],
  );

  const sideMenuTransitions = useTransition(sideMenuIsOpen, null, {
    initial: { transform: 'translateX(350px)' },
    from: { transform: 'translateX(350px)' },
    enter: { transform: 'translateX(0)' },
    leave: { transform: 'translateX(350px)' },
    config: config.default,
  });

  return (
    <HeaderContainer>
      <HeaderContent>
        <NextLink href="/">
          <LogoContainer>
            <Image
              src="https://headshare.s3.amazonaws.com/logos/logo_short_127x127.png"
              alt="Logo"
              width={30}
              height={30}
            />
          </LogoContainer>
        </NextLink>
        <CommunityTitle>
          <NextLink href={`/${communitySlug}`}>
            <button type="button">
              <h4>{communityTitle}</h4>
            </button>
          </NextLink>
        </CommunityTitle>

        {editorSaveState}

        <MenuIcons>
          {addMenuIcon && (
            <MenuContainer
              isOpen={addMenuIsOpen}
              toggleMenu={handleToggleAddMenu}
              menuIcon={addMenuIcon}
              header={{
                type: 'default',
                title: 'Criar',
              }}
              menuItems={[
                {
                  items: [
                    {
                      text: 'Post',
                      onClick: handleNewPost,
                    },
                    {
                      text: 'Categoria',
                      disabled: true,
                    },
                  ],
                },
              ]}
            />
          )}

          <MenuContainer {...userMenuContent} />

          <HoverSideMenu>
            <HamburguerContainer onClick={handleToggleSideMenu}>
              <MdMenu />
            </HamburguerContainer>

            {sideMenuTransitions.map(
              ({ item, props, key }) =>
                item && (
                  <HoverSideMenuContainer key={key} style={props}>
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
                          selected:
                            router.asPath === `/${communitySlug}/categories`,
                        },
                        {
                          text: 'Membros',
                          href: `/${communitySlug}/members`,
                          selected:
                            router.asPath === `/${communitySlug}/members`,
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
                  </HoverSideMenuContainer>
                ),
            )}
          </HoverSideMenu>
        </MenuIcons>
      </HeaderContent>

      <AuthModal />
    </HeaderContainer>
  );
};

export default Header;
