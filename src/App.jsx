
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import HomePage from './Pages/HomePage/HomePage'
import AllGodsPage from './Pages/AllGodsPage/AllGodsPage'
import AddGodPage from './Pages/AddGodPage/AddGodPage'

function App() {
  

  return (
    <>
      <Navbar />
        <Routes >
          <Route path="/" element={<HomePage />}/>
          <Route path="/gods" element={<AllGodsPage />}/>
          <Route path="/new-god" element={<AddGodPage />}/>
        </Routes>

      
      
  
    </>
  )
}

export default App
