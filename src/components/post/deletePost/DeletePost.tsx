import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Post from "../../../models/Post"
import { AuthContext } from "../../../contexts/AuthContext"
import { deleteItem, find } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"

function DeletePost() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [post, setPost] = useState<Post>({} as Post)

  const { id } = useParams<{ id: string }>()

  const { user, handleLogout } = useContext(AuthContext)
  const token = user.token

  async function buscarPorId(id: string) {
    try {
      await find(`/posts/${id}`, setPost, {
        headers: {
          'Authorization': token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        alert('O token expirou, favor logar novamente')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado')
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  async function deletePost() {
    setIsLoading(true)

    try {
      await deleteItem(`/posts/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      alert('Postagem apagada com sucesso')

    } catch (error) {
      alert('Erro ao apagar a Postagem')
      console.log(error)
      console.log(post)
      console.log(id)
    }

    setIsLoading(false)
    back()
  }

  function back() {
    navigate("/postagens")
  }

  return (
    <div className='container w-1/3 mx-auto'>
      <h1 className='text-4xl text-center my-4'>Deletar Postagem</h1>

      <p className='text-center font-semibold mb-4'>
        Você tem certeza de que deseja apagar a postagem a seguir?
      </p>

      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header
          className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
          Postagem
        </header>

        <div className="p-4">
          <p className='text-xl h-full'>{post.title}</p>
          <p>{post.text}</p>
        </div>
        <div className="flex">
          <button
            className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
            onClick={back}
          >
            Não
          </button>

          <button
            className='w-full text-slate-100 bg-indigo-400 
                        hover:bg-indigo-600 flex items-center justify-center'
            onClick={deletePost}
          >
            {isLoading ?
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              /> :
              <span>Sim</span>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletePost