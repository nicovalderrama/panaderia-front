import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    // Verificar si hay datos de usuario en localStorage al cargar la página
    const storedUserData = localStorage.getItem("user_data");
    const accessToken = localStorage.getItem("access_token");

    if (storedUserData && accessToken) {
      const parsedUserData = JSON.parse(storedUserData);
      setIsLoggedIn(true);
      setUserData(parsedUserData);
    }
  }, []);

  const login = (user: User) => {
    setIsLoggedIn(true);
    setUserData(user);
    localStorage.setItem("user_data", JSON.stringify(user));
    // Asegúrate de que el token de acceso se guarde en el localStorage en la función de login
    // localStorage.setItem("access_token", accessToken);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
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
