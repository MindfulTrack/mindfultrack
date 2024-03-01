import { createContext, ReactNode } from 'react';

interface MyContextProps {
  selectedResourceId: number; // Adjust the type based on your state
  updateSelectedResourceId: (newValue: number) => void;
  userId: number;
  setUserId: (newVale: number) => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export default MyContext;
