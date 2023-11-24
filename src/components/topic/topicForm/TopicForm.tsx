import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Topic from "../../../models/Topic";
import { find, register, update } from "../../../services/Service";
import { toastAlert } from "../../../utils/toastAlert";

function TopicForm() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [topic, setTopic] = useState<Topic>({} as Topic);

  const { id } = useParams<{ id: string }>();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  async function findById(id: string) {
    try {
      await find(`/topics/${id}`, setTopic, {
        headers: {
          'Authorization': token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlert('O token expirou, favor logar novamente', "info")
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      toastAlert('Você precisa estar logado', "info");
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      findById(id)
    }
  }, [id])

  function updateTopicState(e: ChangeEvent<HTMLInputElement>) {
    setTopic({
      ...topic,
      [e.target.name]: e.target.value
    })
  }

  async function generateNewTopic(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id !== undefined) {
      try {
        await update(`/topics`, topic, setTopic, {
          headers: {
            'Authorization': token
          }
        })

        toastAlert('Tema atualizado com sucesso', "sucesso")

      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlert('O token expirou, favor logar novamente', "info")
          handleLogout()
        } else {
          toastAlert('Erro ao atualizar o Tema', "erro")
        }
      }

    } else {
      try {
        await register(`/topics`, topic, setTopic, {
          headers: {
            'Authorization': token
          }
        })

        toastAlert('Tema cadastrado com sucesso', "sucesso")

      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlert('O token expirou, favor logar novamente', "info")
          handleLogout()
        } else {
          toastAlert('Erro ao cadastrar o Tema', "erro")
        }
      }
    }

    setIsLoading(false)
    back()
  }

  function back() {
    navigate("/temas")
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
      </h1>

      <form 
        className="w-1/2 flex flex-col gap-4" 
        onSubmit={generateNewTopic}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição do Tema</label>
          <input
            type="text"
            placeholder="Descreva aqui seu tema"
            name='name'
            value={topic.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateTopicState(e)}
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <button
          className="rounded text-slate-100 bg-indigo-400 
                             hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
          type="submit">
          {isLoading ?
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            /> :
            <span>Confirmar</span>
          }
        </button>
      </form>
    </div>
  );
}

export default TopicForm;