import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import UserLogin from '../../models/UserLogin';
import './Login.css';

function Login() {

  const { user, handleLogin, isLoading } = useContext(AuthContext)
  
  const [userLogin, setUserLogin] = useState<UserLogin>(
    {} as UserLogin
  );

  useEffect(() => {
    if (user.token !== "") {
      navigate('/home')
    }
  }, [user])

  function updateUserLoginState(e: ChangeEvent<HTMLInputElement>) {
    console.log(`e.target.name: ${e.target.name}\n e.target.value: ${e.target.value}`)
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    })
  }

  const navigate = useNavigate()

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(userLogin)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">
        <form 
          className="flex justify-center items-center flex-col w-1/2 gap-4"
          onSubmit={login}
        >
          <h2 className="text-slate-900 text-5xl ">Entrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="email"
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              value={userLogin.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateUserLoginState(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="password"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={userLogin.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {updateUserLoginState(e)}}
            />
          </div>
          <input type="submit" hidden/>
          <button
            type='submit'
            className="rounded bg-indigo-400 flex justify-center
                                   hover:bg-indigo-900 text-white w-1/2 py-2">
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
              <span>Entrar</span>}
          </button>

          <hr className="border-slate-800 w-full" />

          <p>
            Ainda não tem uma conta?{' '}
            <Link to="/cadastro" className="text-indigo-800 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
        <div className="backgroundLogin hidden lg:block"></div>
      </div>
    </>
  );
}

export default Login;