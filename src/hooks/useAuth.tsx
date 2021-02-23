import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import { CommonUserFragment, Community, Role } from '../generated/graphql';

export type AuthType = 'login' | 'register' | 'forgotPassword';

type LoggedUser = {
  roles: Array<
    { __typename?: 'Role' } & Pick<Role, 'role'> & {
        community: { __typename?: 'Community' } & Pick<Community, 'slug'>;
      }
  >;
} & CommonUserFragment;

interface AuthContextData {
  isAuthOpen: boolean;
  openAuth(args?: AuthType): void;
  closeAuth(): void;
  authType: AuthType;
  changeAuthType(type: AuthType): void;
  me?: LoggedUser;
  setMe: Dispatch<SetStateAction<LoggedUser | undefined>>;
  isMember?: boolean;
  setIsMember: Dispatch<SetStateAction<boolean | undefined>>;
  isCreator?: boolean;
  setIsCreator: Dispatch<SetStateAction<boolean | undefined>>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [isAuthOpen, setAuthOpen] = useState<boolean>(false);
  const [authType, setAuthType] = useState<AuthType>('login');

  const [isCreator, setIsCreator] = useState<boolean | undefined>(undefined);
  const [isMember, setIsMember] = useState<boolean | undefined>(undefined);
  const [me, setMe] = useState<LoggedUser | undefined>(undefined);

  const openAuth = useCallback((state?: AuthType) => {
    state && setAuthType(state);
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
