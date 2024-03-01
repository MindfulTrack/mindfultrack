'use client'
import React, { useState, ReactNode } from 'react';
import MyContext from './MyContext';
import { useSession } from 'next-auth/react';

interface MyProviderProps {
  children: ReactNode;
}

const MyProvider: React.FC<MyProviderProps> = ({ children }) => {

  const {data: session} : any = useSession();
  const userID = session === null ? 0 : session.user?.pk 
  const [selectedResourceId, setSelectedResourceId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(userID);
  console.log(userId)

  const updateSelectedResourceId = (newValue: number) => {
    setSelectedResourceId(newValue);
  };

  return (
    <MyContext.Provider value={{ selectedResourceId, updateSelectedResourceId, userId, setUserId }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
