
import React, { createContext, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserContextType = {
  user: boolean; 
  setUser: (user: boolean) => void;
  login: () => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: false,
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState(false); 

  const setUser = (user: boolean) => {
    setUserState(user);
    AsyncStorage.setItem('user', JSON.stringify(user));
  };

  const login = () => {
    setUser(true);
  };

  const logout = () => {
    setUser(false);
  };

  React.useEffect(() => {
    // Check if user was previously logged in
    const checkUserStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUserState(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking user status:', error);
      }
    };

    checkUserStatus();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};