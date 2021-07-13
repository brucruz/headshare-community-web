import { AuthProvider } from './useAuth';
import { SnackbarProvider } from './useSnackbar';

export const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <SnackbarProvider>{children}</SnackbarProvider>
  </AuthProvider>
);

export default AppProvider;
