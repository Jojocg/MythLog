import { Route, Routes } from 'react-router-dom'
import './App.css'

import Navbar from './Components/Navbar/Navbar'
import HomePage from './Pages/HomePage/HomePage'
import AllGodsPage from './Pages/AllGodsPage/AllGodsPage'
import GodDetailsPage from './Pages/GodDetailsPage/GodDetailsPage'
import AddGodPage from './Pages/AddGodPage/AddGodPage'
import EditGodPage from './Pages/EditGodPage/EditGodPage'

function App() {

  return (
    <>
      <Navbar />
      <div className='mt-16'>
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/gods" element={<AllGodsPage />} />
          <Route path="/gods/:godId" element={<GodDetailsPage />} />
          <Route path="/gods/create" element={<AddGodPage />} />
          <Route path="/gods/update/:godId" element={<EditGodPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
