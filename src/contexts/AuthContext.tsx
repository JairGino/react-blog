import { ReactNode, createContext, useState } from "react";

import UserLogin from "../models/UserLogin"
import { login } from "../services/Service"
import { toastAlert } from "../utils/toastAlert";

interface AuthContextProps {
  user: UserLogin
  handleLogin(user: UserLogin): Promise<void>
  handleLogout(): void
  isLoading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserLogin>({
    id: 0,
    name: "",
    email: "",
    password: "",
    photoUrl: "",
    token: ""
  });

  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(userLogin: UserLogin) {
    setIsLoading(true)
    try {
      await login(`/users/login`, userLogin, setUser)
      toastAlert("Usuário logado com sucesso", "sucesso")
      setIsLoading(false)

    } catch (error) {
      console.log(error)
      toastAlert("Dados do usuário inconsistentes", "erro")
      setIsLoading(false)
    }
  }

  function handleLogout() {
    setUser({
      id: 0,
      name: "",
      email: "",
      password: "",
      photoUrl: "",
      token: ""
    })
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

