'use client'
import React, { useState, ReactNode } from 'react';
import MyContext from './MyContext';

interface MyProviderProps {
  children: ReactNode;
}

const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [selectedResourceId, setSelectedResourceId] = useState<number>(0);

  const updateSelectedResourceId = (newValue: number) => {
    setSelectedResourceId(newValue);
  };

  return (
    <MyContext.Provider value={{ selectedResourceId, updateSelectedResourceId }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
