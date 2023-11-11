import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

import { registerUsuario } from '../../services/Service'
import User from '../../models/User'

import './Register.css'

function Register() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const [user, setUser] = useState<User>({
    id: 100,
    name: '',
    email: '',
    password: '',
    photoUrl: ''
  })

  useEffect(() => {
    if (user.id !== 100) {
      backToLoginPage()
    }
  }, [user])


  function backToLoginPage() {
    navigate('/login')
  }

  function handleConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value)
  }

  function updateUserState(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  async function registerNewUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmPassword === user.password && user.password.length >= 8) {
      setIsLoading(true)

      try {
        await registerUsuario(`/users/signup`, user, setUser)
        alert('Usuário cadastrado com sucesso')

      } catch (error) {
        alert('Erro ao cadastrar o Usuário')
      }
    } else {
      alert('Dados inconsistentes. Verifique as informações de cadastro.')
      setUser({ ...user, password: "" })
      setConfirmPassword("")
    }

    setIsLoading(false)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <div className="backgroundRegister hidden lg:block"></div>
        <form
          className='flex justify-center items-center flex-col w-2/3 gap-3'
          onSubmit={registerNewUser}
        >
          <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="name"
              placeholder="Nome"
              value={user.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateUserState(e)}
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="email"
              placeholder="Usuario"
              value={user.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateUserState(e)}
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="photoUrl"
              placeholder="Foto"
              value={user.photoUrl}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateUserState(e)}
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="password"
              placeholder="Senha"
              value={user.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateUserState(e)}
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmPassword"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmPassword(e)}
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <input type="submit" hidden/>
          <div className="flex justify-around w-full gap-8">
            <button
              className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2'
              onClick={backToLoginPage}
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='rounded text-white bg-indigo-400 
                           hover:bg-indigo-900 w-1/2 py-2 flex justify-center'
            >
              {isLoading 
                ?
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                /> 
                :
                <span>Cadastrar</span>}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register