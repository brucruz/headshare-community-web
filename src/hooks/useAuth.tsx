import { createContext, useCallback, useContext, useState } from 'react';

export type AuthType = 'login' | 'register' | 'forgotPassword';

interface AuthContextData {
  isAuthOpen: boolean;
  openAuth(args?: AuthType): void;
  closeAuth(): void;
  authType: AuthType;
  changeAuthType(type: AuthType): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [isAuthOpen, setAuthOpen] = useState<boolean>(false);
  const [authType, setAuthType] = useState<AuthType>('login');

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
