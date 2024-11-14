import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import {
  registerRequest,
  verifyTokenRequest,
  loginRequest,
} from "../services/auth";
import { UserRegistrationData } from "../models/UserRegistrationData";

interface AuthContextProps {
  user: UserRegistrationData | null;
  loading: boolean;
  signup: (userData: UserRegistrationData) => Promise<void>;
  isAuthenticated: boolean;
  authErrors: { field: string; message: string }[];
  clearErrors: () => void;
  signIn: (credentials: UserRegistrationData) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro de un provider AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserRegistrationData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authErrors, setAuthErrors] = useState<
    { field: string; message: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const signup = async (userData: UserRegistrationData): Promise<void> => {
    try {
      const response = await registerRequest(userData);
      if (response && response.data) {
        const { data } = response;
        setUser(data);
        setIsAuthenticated(false);
        return Promise.resolve();
      }
    } catch (error) {
      handleAuthError(error);
      return Promise.reject(error);
    }
  };

  const handleAuthError = (error: any): void => {
    if (error.response && error.response.data) {
      const responseData = error.response.data;
      if (responseData.errors) {
        const yupErrors = responseData.errors.map((err: any) => ({
          field: err.field,
          message: err.message,
        }));
        setAuthErrors(yupErrors);
      } else if (responseData.message) {
        if (responseData.message === "El correo electrónico ya está en uso") {
          setAuthErrors([
            { field: "email", message: "El correo electrónico ya está en uso" },
          ]);
        } else {
          setAuthErrors([{ field: "network", message: responseData.message }]);
        }
      } else {
        setAuthErrors([{ field: "network", message: "Error desconocido" }]);
      }
    } else {
      setAuthErrors([{ field: "network", message: "Error de red" }]);
    }
  };

  const clearErrors = useCallback(() => {
    setAuthErrors([]);
  }, []);

  const signIn = async (credentials: UserRegistrationData): Promise<void> => {
    clearErrors();
    try {
      const response = await loginRequest(credentials);
      if (response && response.data && response.headers) {
        const { data, headers } = response;
        if (headers.authorization) {
          const token = headers.authorization.split(" ")[1];
          localStorage.setItem("token", token);
          localStorage.setItem("userId", data.id);
          localStorage.setItem("userType", data.userType);
          setUser(data);
          setIsAuthenticated(true);
          return Promise.resolve();
        } else {
          setAuthErrors([{ field: "network", message: "Error de red" }]);
          return Promise.reject();
        }
      }
    } catch (error) {
      handleAuthError(error);
      return Promise.reject(error);
    }
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    setUser(null);
    setIsAuthenticated(false);
    setAuthErrors([]);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        return;
      }

      try {
        const res = await verifyTokenRequest(token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        isAuthenticated,
        authErrors,
        clearErrors,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
