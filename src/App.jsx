
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import HomePage from './Pages/HomePage/HomePage'
import AllGodsPage from './Pages/AllGodsPage/AllGodsPage'

function App() {
  

  return (
    <>
      <Navbar />
        <Routes >
          <Route path="/" element={<HomePage />}/>
          <Route path="/gods" element={<AllGodsPage />}/>

        </Routes>

      
      
  
    </>
  )
}

export default App
