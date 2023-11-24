import { useContext, useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Post from "../../../models/Post";
import { find } from "../../../services/Service";
import PostCard from "../postCard/PostCard";
import { toastAlert } from "../../../utils/toastAlert";

function PostList() {

  const navigate = useNavigate()

  const [posts, setPosts] = useState<Post[]>([]);

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token

  async function findPosts() {
    try {
      await find('posts', setPosts, {
        headers: {
          Authorization: token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlert('O token expirou , favor logar novamente', "info")
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      toastAlert('Você precisa estar logado', "sucesso")
      navigate('/');
    }
  }, [token])

  useEffect(() => {
    findPosts()
  }, [posts.length])

  return (
    <>
      {posts.length === 0 && (
        <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}

      <div className='container mx-auto my-4 
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

export default PostList;