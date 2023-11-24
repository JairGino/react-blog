import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Topic from "../../../models/Topic";
import Post from "../../../models/Post";
import { AuthContext } from "../../../contexts/AuthContext";
import { find, register, update } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { toastAlert } from "../../../utils/toastAlert";

function PostForm() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [topics, setTopics] = useState<Topic[]>([])

  const [topic, setTopic] = useState<Topic>({ id: 0, name: '', })
  const [post, setPost] = useState<Post>({} as Post)

  const { id } = useParams<{ id: string }>()

  const { user, handleLogout } = useContext(AuthContext)
  const token = user.token

  async function findPostById(id: string) {
    await find(`/posts/${id}`, setPost, {
      headers: {
        Authorization: token,
      },
    })
  }

  async function findTopicById(id: string) {
    await find(`/topics/${id}`, setTopic, {
      headers: {
        Authorization: token,
      },
    })
  }

  async function findTopics() {
    await find('/topics', setTopics, {
      headers: {
        Authorization: token,
      },
    })
  }

  useEffect(() => {
    if (token === '') {
      toastAlert('Você precisa estar logado', "info");
      navigate('/');
    }
  }, [token])

  useEffect(() => {
    findTopics()

    if (id !== undefined) {
      findPostById(id)
    }
  }, [id])

  useEffect(() => {
    setPost({
      ...post,
      topic: topic,
    })
  }, [topic])

  function updatePostState(e: ChangeEvent<HTMLInputElement>) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
      topic: topic,
      user: user,
    });
  }

  async function generateNewPost(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id != undefined) {
      try {
        await update(`/posts`, post, setPost, {
          headers: {
            Authorization: token,
          },
        });

        toastAlert('Postagem atualizada com sucesso', "sucesso")

      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlert('O token expirou, favor logar novamente', "info")
          handleLogout()
        } else {
          toastAlert('Erro ao atualizar a Postagem', "erro")
        }
      }

    } else {
      try {
        await register(`/posts`, post, setPost, {
          headers: {
            Authorization: token,
          },
        })

        toastAlert('Postagem cadastrada com sucesso', "sucesso");

      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlert('O token expirou, favor logar novamente', "info")
          handleLogout()
        } else {
          toastAlert('Erro ao cadastrar a Postagem', "erro");
        }
      }
    }

    setIsLoading(false)
    back()
  }

  const LoadingTopic = topic.name === '';

  function back() {
    navigate('/postagens');
  }

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={generateNewPost}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Título da Postagem</label>
          <input
            type="text"
            placeholder="Insira aqui o Título"
            name="title"
            value={post.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatePostState(e)}
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Texto da Postagem</label>
          <input
            type="text"
            placeholder="Adicione aqui o Texto da Postagem"
            name="text"
            value={post.text}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatePostState(e)}
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Tema da Postagem</p>
          <select
            id="tema"
            name="topic"
            onChange={(e) => findTopicById(e.currentTarget.value)}
            className='border p-2 border-slate-800 rounded'
          >
            <option value="" selected disabled>Selecione um Tema</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}> 
                {topic.name} 
              </option>
            ))}
          </select>
        </div>
        <button
          type='submit'
          disabled={LoadingTopic}
          className='flex justify-center rounded disabled:bg-slate-200 bg-indigo-400 
                          hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2'
        >
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

export default PostForm;