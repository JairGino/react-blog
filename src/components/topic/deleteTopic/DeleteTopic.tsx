import { useContext, useEffect, useState } from "react"
import { RotatingLines } from "react-loader-spinner"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import Topic from "../../../models/Topic"
import { deleteItem, find } from "../../../services/Service"

function DeleteTopic() {

  const { id } = useParams<{ id: string }>()

  const navigate = useNavigate()

  const [topic, setTopic] = useState<Topic>({} as Topic)
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  const { user, handleLogout } = useContext(AuthContext)
  const token = user.token

  async function findTopicById(id: string) {
    try {
      await find(`/topics/${id}`, setTopic, {
        headers: {
          'Authorization': token
        }
      })
    } catch (error: any) {
      if (error.toString().include('403')) {
        alert('O token expirou, favor logar novamente')
        handleLogout()
      }
    }
  }

  async function deleteTopic() {
    setIsLoading(true)

    try {
      await deleteItem(`/topics/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      alert('Tema apagado com sucesso')
    } catch (error) {
      console.log(error)
      alert('Erro ao apagar o Tema')
    }

    setIsLoading(false)
    back()
  }

  function back() {
    navigate('/temas')
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado')
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      findTopicById(id)
    }
  }, [id])

  return (
    <div className='container w-1/3 mx-auto'>
      <h1 className='text-4xl text-center my-4'>Deletar tema</h1>
      <p className='text-center font-semibold mb-4'>
        Você tem certeza de que deseja apagar o tema a seguir?</p>
      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header
          className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
          Tema
        </header>
        <p className='p-8 text-3xl bg-slate-200 h-full'>{topic.name}</p>
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
            onClick={deleteTopic}
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
export default DeleteTopic