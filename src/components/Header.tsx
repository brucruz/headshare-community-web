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
  MenuItem,
  Menu,
  PostSaveStatus,
} from '../styles/components/Header';
import Button from './Button';
import {
  useHeaderMeQuery,
  useLogoutMutation,
  CommonUserFragment,
  Community,
  Role,
  RoleOptions,
  useCreatePostMutation,
} from '../generated/graphql';
import { isServer } from '../utils/isServer';
import AuthModal from './AuthModal';
import { useAuth, AuthType } from '../hooks/useAuth';

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
  const [isCreator, setIsCreator] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [user, setUser] = useState<
    | ({
        roles: Array<
          { __typename?: 'Role' } & Pick<Role, 'role'> & {
              community: { __typename?: 'Community' } & Pick<Community, 'slug'>;
            }
        >;
      } & CommonUserFragment)
    | undefined
  >(undefined);

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
          setUser(userData.me.user);

          const commRole = userData.me.user.roles.find(
            role => role.community.slug === communitySlug,
          )?.role;

          if (commRole === RoleOptions.Creator) {
            setIsCreator(true);
          } else if (commRole === RoleOptions.Member) {
            setIsMember(true);
          }
        }
      }
    }
  }, [userData]);

  const handleLogout = useCallback(() => {
    logout();
    apolloClient.resetStore();

    if (router.pathname === `/${communitySlug}`) {
      router.reload();
    } else {
      router.push(`/${communitySlug}`);
    }
  }, [router, apolloClient, logout, communitySlug]);

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
    if (!user) {
      return (
        <MenuContainer>
          {/* <NextLink href="/login"> */}
          <button type="button" onClick={() => openAuthModal('login')}>
            <MenuItem>Entrar</MenuItem>
          </button>
          {/* </NextLink> */}
          {/* <NextLink href="/register"> */}
          <button type="button" onClick={() => openAuthModal('register')}>
            <MenuItem>Cadastrar</MenuItem>
          </button>
          {/* </NextLink> */}
        </MenuContainer>
      );
    }
    return (
      <MenuContainer>
        <MenuItem noHover>
          <p>
            <strong>
              {user.name} {user.surname}
            </strong>
          </p>
          <p>{user.email}</p>
        </MenuItem>
        <NextLink href="/me">
          <MenuItem disabled>Meu Perfil</MenuItem>
        </NextLink>
        {/* <NextLink href="/"> */}
        <MenuItem disabled>Minhas comunidades</MenuItem>
        {/* </NextLink> */}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuContainer>
    );
  }, [user, handleLogout, openAuthModal]);

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
