'use client';
import { CookiePreferences } from '@/lib/cookie';
import { UserType } from '@/types/UserType';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

type loginFormProps = {
  title: string;
  message: string;
  redirectionUrl: string;
  callbackAction: ((...args: unknown[]) => unknown) | undefined;
};

type GlobalContextType = {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  toggleLoginModal: () => void;
  isSnackbarVisible: boolean;
  openSnackbar: () => void;
  closeSnackbar: () => void;
  toggleSnackbar: () => void;
  snackbarContent: string | null;
  setSnackbarContent: Dispatch<SetStateAction<string | null>>;
  loginFormProps: loginFormProps;
  updateLoginProps: (props: Partial<loginFormProps>) => void;
  user: UserType | undefined;
  setUser: Dispatch<SetStateAction<undefined>>;
  isCookieModalVisible: boolean;
  setIsCookieModalVisible: Dispatch<SetStateAction<boolean>>;
};
export const globalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextHandler = ({
  children,
  cookiePreferences,
}: {
  children: ReactNode;
  cookiePreferences: CookiePreferences | undefined;
}) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCookieModalVisible, setIsCookieModalVisible] = useState(cookiePreferences === undefined);

  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState<string | null>(null);
  const [loginFormProps, setLoginFormProps] = useState<loginFormProps>({
    title: 'Connexion',
    message: 'Connectez-vous pour accéder à votre compte',
    redirectionUrl: '/',
    callbackAction: undefined,
  });
  const [user, setUser] = useState(undefined);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const toggleLoginModal = () => setIsLoginModalOpen((prev) => !prev);
  const openSnackbar = () => setIsSnackbarVisible(true);
  const closeSnackbar = () => setIsSnackbarVisible(false);
  const toggleSnackbar = () => setIsSnackbarVisible((prev) => !prev);

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
        user,
        setUser,
        isSnackbarVisible,
        openSnackbar,
        closeSnackbar,
        toggleSnackbar,
        snackbarContent,
        setSnackbarContent,
        isCookieModalVisible,
        setIsCookieModalVisible,
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
