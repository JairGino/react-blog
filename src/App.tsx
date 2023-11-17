
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Register from './pages/Register/Register'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import { AuthProvider } from './contexts/AuthContext'
import TopicList from './components/topic/topicList/TopicList'
import TopicForm from './components/topic/topicForm/TopicForm'
import DeleteTopic from './components/topic/deleteTopic/DeleteTopic'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/temas" element={<TopicList />} />
            <Route path="/cadastroTema" element={<TopicForm />} />
            <Route path="/editarTema/:id" element={<TopicForm />} />
            <Route path="/deletarTema/:id" element={<DeleteTopic />} />
          </Routes>
        </div>
        
        <Footer />
      </BrowserRouter>
    </ AuthProvider>
  )
}

export default App
