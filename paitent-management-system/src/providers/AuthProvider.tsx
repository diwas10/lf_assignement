import React, { useEffect, useState } from 'react';
import { LoginResponse } from '../core/public/login/login.schema';
import TokenService from '../services/token.service';
import { useLogout } from '../hooks/queries/useLogout';

interface AuthContextInterface {
  user: LoginResponse['user'] | null;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<LoginResponse['user'] | null>>;

  logout(): void;
}

export const AuthContext = React.createContext<AuthContextInterface>({
  user: null,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  logout: () => {}
});

interface Props {
  children: React.ReactNode;
}

export function AuthProvider(props: Props) {
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logoutMutation = useLogout();

  useEffect(() => {
    setIsAuthenticated(!!TokenService.getAccessToken());
    setUser(TokenService.getUserData()!);
  }, []);

  const logout = () => {
    logoutMutation.mutate();
    setIsAuthenticated(false);
    setUser(null);
    setTimeout(TokenService.clearToken);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, setIsAuthenticated, isAuthenticated, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return React.useContext(AuthContext);
};
