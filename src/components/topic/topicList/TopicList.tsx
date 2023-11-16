import { useContext, useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Topic from "../../../models/Topic";
import { find } from "../../../services/Service";
import TopicCard from "../topicCard/TopicCard";

function TopicList() {

  const [topics, setTopics] = useState<Topic[]>([])

  const navigate = useNavigate()

  const { user, handleLogout } = useContext(AuthContext)
  const token = user.token

  async function findTopics() {
    try {
      await find('/topics', setTopics, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error. toString().includes('403')) {
        alert ('O token expirou, favor logar novamente')
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
    findTopics()
  }, [topics.length])

  return (
    <>
      {topics.length === 0 && (
        <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {topics.map((topic) => (
              <>
                <TopicCard key={topic.id} topic={topic} />
              </>
            ))}

          </div>
        </div>
      </div>
    </>
  )
}

export default TopicList;