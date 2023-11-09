
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Register from './pages/Register/Register'
import Home from './pages/home/Home'
import Login from './pages/login/Login'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/cadastro" element={<Register />} /> */}
          </Routes>
        </div>
        
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
