import { createContext, ReactNode, useContext } from "react";
import { getCurrentUser } from "./api";
import { useApi } from "./useApi";

interface User {
  $id: string;
  email: string;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  // user: User | null;
  token: string | null;
  loading: boolean;
  refetch: (newParams?: void) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const { data: token, loading, refetch } = useApi({ fn: getCurrentUser });

  const isLoggedIn = !!token;

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        token,
        loading,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};

export default GlobalProvider;
