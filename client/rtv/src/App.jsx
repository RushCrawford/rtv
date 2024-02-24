import './App.css'
import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './context/UserProvider.jsx'
import Auth from './components/Auth'
import Navbar from './components/Navbar.jsx'
import Public from './components/Public.jsx'
import Profile from './components/Profile.jsx'


function App() {
  const { userState: {token} } = useContext(UserContext)
  

  return (
    <section className='hero is-primary is-fullheight is-fullwidth' >
      <div>
        {token && <Navbar />}
        <Routes>
          <Route 
            path='/'
            element={ token ? <Profile /> : <Auth /> }
          />
          <Route 
            path='/profile'
            element={ token ? <Profile /> : <Auth /> }
          />
        </Routes>
      </div>
    </section>
  )
}

export default App
