import { useCallback, useEffect, useMemo, useState } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import {
  HeaderContainer,
  HeaderContent,
  LogoContainer,
  HamburguerContainer,
  CommunityTitle,
  MenuContainer,
  MenuItem as MenuItemOld,
  MeItem,
  Menu,
  PostSaveStatus,
} from '../styles/components/Header';
import Button from './Button';
import {
  useHeaderMeQuery,
  useLogoutMutation,
  RoleOptions,
  useCreatePostMutation,
} from '../generated/graphql';
import { isServer } from '../utils/isServer';
import AuthModal from './AuthModal';
import { useAuth, AuthType } from '../hooks/useAuth';
import { MenuItem } from './MenuItem';

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
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const {
    isCreator,
    isMember,
    setIsCreator,
    setIsMember,
    me,
    setMe,
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
          } else if (commRole === RoleOptions.Member) {
            setIsCreator(false);
            setIsMember(true);
          } else {
            setIsCreator(false);
            setIsMember(false);
          }
        }
      }
    }
  }, [userData, communitySlug, setMe, setIsCreator, setIsMember]);

  const handleLogout = useCallback(() => {
    logout();
    apolloClient.resetStore();
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
        // eslint-disable-next-line no-underscore-dangle
        const id = result.data?.createPost.post?._id;

        router.push(`/${communitySlug}/draft?id=${id.toString()}`);
      }
    }
  }, [createPost, router, communitySlug]);

  const ctaButton = useMemo((): JSX.Element | undefined => {
    if (!isCreator && !isMember) {
      return <Button text="Assinar" />;
    }
    if (isCreator) {
      if (!editorMode) {
        return <Button text="Publicar" onClick={handleNewPost} />;
      }
      return undefined;
    }
    return undefined;
  }, [isCreator, isMember, editorMode, handleNewPost]);

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

  const handleMenuToggle = useCallback(() => {
    setMenuIsOpen(!menuIsOpen);
  }, [menuIsOpen]);

  const openAuthModal = useCallback(
    (state?: AuthType) => {
      setMenuIsOpen(false);

      openAuth(state);
    },
    [openAuth],
  );

  const menuContent = useMemo(() => {
    if (!me) {
      return (
        <MenuContainer>
          <MenuItem text="Entrar" onClick={() => openAuthModal('login')} />
          <MenuItem
            text="Cadastrar"
            onClick={() => openAuthModal('register')}
          />
        </MenuContainer>
      );
    }
    return (
      <MenuContainer>
        <MeItem>
          <p>
            <strong>
              {me.name} {me.surname}
            </strong>
          </p>
          <p>{me.email}</p>
        </MeItem>
        <MenuItem text="Meu Perfil" href="/me" />
        {/* <MenuItem text="Minhas comunidades" /> */}
        <MenuItem text="Posts" href={`/${communitySlug}/admin/posts`} />
        <MenuItem
          text="Categorias"
          href={`/${communitySlug}/admin/categories`}
        />
        <MenuItem text="Logout" onClick={handleLogout} />
      </MenuContainer>
    );
  }, [me, communitySlug, handleLogout, openAuthModal]);

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

        {ctaButton}

        <Menu>
          <HamburguerContainer onClick={handleMenuToggle}>
            <Image
              src="https://headshare.s3.amazonaws.com/assets/hamburguer_icon.png"
              alt="Menu"
              width={40}
              height={40}
            />
          </HamburguerContainer>
          {menuIsOpen && menuContent}
        </Menu>
      </HeaderContent>

      <AuthModal />
    </HeaderContainer>
  );
};

export default Header;
