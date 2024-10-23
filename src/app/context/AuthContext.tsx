import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userData: User | null;
  setIsLoggedIn: (value: boolean) => void;
  setUserData: (user: User | null) => void;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const userDataString = localStorage.getItem("user_data");

    if (accessToken && userDataString) {
      const user = JSON.parse(userDataString);
      setIsLoggedIn(true);
      setUserData(user);
    } else if (!isPublicRoute('')) {
      router.push('/login');
    }
  }, [router]);

  const login = (user: User, accessToken: string, refreshToken: string) => {
    setIsLoggedIn(true);
    setUserData(user);
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("user_data", JSON.stringify(user));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
    router.push('/login');
  };

  const isPublicRoute = (path: string) => {
    const publicRoutes = ['/login', '/register', '/forgot-password'];
    return publicRoutes.includes(path);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userData,
        setIsLoggedIn,
        setUserData,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext };