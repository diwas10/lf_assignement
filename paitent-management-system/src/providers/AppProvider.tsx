import React, { useState } from 'react';
import useToggle from '../hooks/useToggle';

interface AppContextInterface {
  isSidebarOpen: boolean;

  toggleSidebar(): void;

  setHeaderText: React.Dispatch<React.SetStateAction<string>>;
  headerText: string;
}

export const AppContext = React.createContext<AppContextInterface>({
  isSidebarOpen: true,
  toggleSidebar: () => {},
  setHeaderText: () => {},
  headerText: ''
});

interface Props {
  children: React.ReactNode;
}

export function AppProvider(props: Props) {
  const [isSidebarOpen, toggleSidebar] = useToggle(true);
  const [headerText, setHeaderText] = useState('');

  return (
    <AppContext.Provider value={{ isSidebarOpen, toggleSidebar, setHeaderText, headerText }}>
      {props.children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  return React.useContext(AppContext);
};
