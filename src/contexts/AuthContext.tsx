import { ReactNode, createContext, useState } from "react";

interface AuthContextProps {
  name: string
  changeName: (newName: string) => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [name, setName] = useState('');

  function changeName(newName: string) {
    setName(newName)
  }

  return (
    <AuthContext.Provider value={{ name, changeName }}>
      {children}
    </AuthContext.Provider>
  )
}

