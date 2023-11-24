import Popup from 'reactjs-popup';
import PostForm from '../postForm/PostForm';

import 'reactjs-popup/dist/index.css';
import './PostModal.css'

function PostModal() {
  return (
    <>
      <Popup
        trigger={
          <button
            className='border rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
            Nova Postagem
          </button>
        }
        modal
      >
        <PostForm/>
      </Popup>
    </>
  );
}

export default PostModal;