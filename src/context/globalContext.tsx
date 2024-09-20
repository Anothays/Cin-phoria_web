'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

type GlobalContextType = {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  toggleLoginModal: () => void;
  isLogged: boolean;
  setIsLogged: (bool: boolean) => void;
};
export const globalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextHandler = ({ children }: { children: ReactNode }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const toggleLoginModal = () => setIsLoginModalOpen((prev) => !prev);

  return (
    <globalContext.Provider
      value={{
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        toggleLoginModal,
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(globalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
};
