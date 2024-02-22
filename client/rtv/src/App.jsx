import './App.css'
import { useContext } from 'react'
import Auth from './components/Auth'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './context/UserProvider.jsx'
import Navbar from './components/Navbar.jsx'


function App() {
  const { userState: {token} } = useContext(UserContext)
  

  return (
    <div>
      {token && <Navbar />}
      <Routes>
        <Route 
          path='/'
          element={ <Auth /> }
        />
      </Routes>
    </div>
  )
}

export default App
