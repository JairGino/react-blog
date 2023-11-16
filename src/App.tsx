
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Register from './pages/Register/Register'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import { AuthProvider } from './contexts/AuthContext'
import TopicList from './components/topic/topicList/TopicList'

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
          </Routes>
        </div>
        
        <Footer />
      </BrowserRouter>
    </ AuthProvider>
  )
}

export default App
