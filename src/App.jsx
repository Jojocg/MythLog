
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import HomePage from './Pages/HomePage/HomePage'
import AllGodsPage from './Pages/AllGodsPage/AllGodsPage'
import AddGodPage from './Pages/AddGodPage/AddGodPage'
import GodDetailsPage from './Pages/GodDetailsPage/GodDetailsPage'

function App() {
  

  return (
    <>
      <Navbar />
        <div className='mt-24'>
        <Routes >
          <Route path="/" element={<HomePage />}/>
          <Route path="/gods" element={<AllGodsPage />}/>
          <Route path="/gods/:godId" element={<GodDetailsPage />}/>
          <Route path="/new-god" element={<AddGodPage />}/>
        </Routes>
        </div>
      
      
  
    </>
  )
}

export default App
