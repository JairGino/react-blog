import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

function Navbar() {
  
  const navigate = useNavigate()
  const { handleLogout } = useContext(AuthContext)

  function logout() {
    handleLogout()
    alert('Usuário deslogado com sucesso')
    navigate('/login')
  }

  return (
    <>
      <div className="w-full bg-indigo-900 text-white flex justify-center py-4">
        
        <div className="container flex justify-between text-lg">
          <div className="text-2xl font-bold">
            <Link to='/home' >Blog Pessoal</Link>
          </div>

          <div className="flex gap-4">
            <Link to='/postagens' className="hover:underline">Postagens</Link>
            <Link to='/temas' className="hover:underline">Temas</Link>
            <Link to='/cadastroTema' className="hover:underline">Cadastrar tema</Link>
            <Link to='/perfil' className="hover:underline">Perfil</Link>
            <Link to='' onClick={logout} className="hover:underline">Sair</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar