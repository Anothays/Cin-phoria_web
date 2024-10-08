'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

type loginFormProps = {
  title: string;
  message: string;
  redirectionUrl: string;
  callbackAction: (...args: any[]) => any;
};

type GlobalContextType = {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  toggleLoginModal: () => void;
  loginFormProps: loginFormProps;
  updateLoginProps: (props: Partial<loginFormProps>) => void;
};
export const globalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextHandler = ({ children }: { children: ReactNode }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginFormProps, setLoginFormProps] = useState({
    title: 'Connexion',
    message: 'Connectez-vous pour accéder à votre compte',
    redirectionUrl: '/',
    callbackAction: () => {},
  });

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const toggleLoginModal = () => setIsLoginModalOpen((prev) => !prev);
  const updateLoginProps = (props: Partial<loginFormProps>) =>
    setLoginFormProps((prev) => ({ ...prev, ...props }));

  return (
    <globalContext.Provider
      value={{
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        toggleLoginModal,
        loginFormProps,
        updateLoginProps,
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
