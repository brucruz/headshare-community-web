/* eslint-disable no-underscore-dangle */
import { FetchResult } from '@apollo/client';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  CommonUserFragment,
  Community,
  LoginMutation,
  Role,
  useFollowCommunityMutation,
  useLoginMutation,
} from '../generated/graphql';
import { useSnackbar } from './useSnackbar';

export type AuthType = 'login' | 'register' | 'forgotPassword';

type LoggedUser = {
  roles: Array<
    { __typename?: 'Role' } & Pick<Role, 'role'> & {
        community: { __typename?: 'Community' } & Pick<Community, 'slug'>;
      }
  >;
} & CommonUserFragment;

interface AfterAuth {
  redirect?: string;
  followCommunity: {
    communityId: string;
  };
}
interface AuthOptions {
  after?: AfterAuth;
}

interface AuthContextData {
  isAuthOpen: boolean;
  openAuth(args?: AuthType, options?: AuthOptions): void;
  closeAuth(): void;
  authType: AuthType;
  changeAuthType(type: AuthType): void;
  me?: LoggedUser;
  setMe: Dispatch<SetStateAction<LoggedUser | undefined>>;
  isFollower?: boolean;
  setIsFollower: Dispatch<SetStateAction<boolean | undefined>>;
  isMember?: boolean;
  setIsMember: Dispatch<SetStateAction<boolean | undefined>>;
  isCreator?: boolean;
  setIsCreator: Dispatch<SetStateAction<boolean | undefined>>;
  afterAuth?: AfterAuth;
  setAfterAuth: Dispatch<SetStateAction<AfterAuth | undefined>>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [isAuthOpen, setAuthOpen] = useState<boolean>(false);
  const [authType, setAuthType] = useState<AuthType>('login');

  const [isCreator, setIsCreator] = useState<boolean | undefined>(undefined);
  const [isMember, setIsMember] = useState<boolean | undefined>(undefined);
  const [isFollower, setIsFollower] = useState<boolean | undefined>(undefined);
  const [me, setMe] = useState<LoggedUser | undefined>(undefined);
  const [afterAuth, setAfterAuth] = useState<AfterAuth | undefined>(undefined);

  const openAuth = useCallback((state?: AuthType, options?: AuthOptions) => {
    state && setAuthType(state);

    options?.after && setAfterAuth(options.after);

    setAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setAuthOpen(false);
  }, []);

  const changeAuthType = useCallback((type: AuthType) => {
    setAuthType(type);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthOpen,
        openAuth,
        closeAuth,
        authType,
        changeAuthType,
        me,
        setMe,
        isCreator,
        setIsCreator,
        isMember,
        setIsMember,
        isFollower,
        setIsFollower,
        afterAuth,
        setAfterAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
