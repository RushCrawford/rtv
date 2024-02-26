import { UserContext } from "../context/UserProvider"
import AuthForm from "./AuthForm"
import { useContext, useState } from "react"
import { Link } from 'react-router-dom'


const initInputs = { username: '', password: '' } // initial state object for the input state

function Auth() {
    const { signup, login, userState: {errMsg} } = useContext(UserContext) // bring in userState and context functions
    const [inputs, setInputs] = useState(initInputs) // state variable to hold and control the values of the form inputs
    const [toggle, setToggle] = useState(false) // toggle to handle login and signup form rendering

    const handleChange = (e) => { // handles changes in the input fields
        const { name, value } = e.target // extract name and value out of event.target
        setInputs(prevInput => ({ // update input state using previous values and new values
            ...prevInput,
            [name]: value
        }))
    }

    const handleSignup = (e)=> {
        e.preventDefault() // keeps inputs from refreshing
        signup(inputs) // passing input values to signup function in UserProvider
        setInputs(initInputs) // reset inputs
    }

    const handleLogin = (e)=> {
        e.preventDefault() // keeps inputs from refreshing
        login(inputs) // passing input values to login function in UserProvider
        setInputs(initInputs) // reset inputs
    }

    return (
        <div className="container"> 
        <div className="hero-head">
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item">
                            <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo" />
                        </a>
                    </div>
                    <div id="navbarMenuHeroA" className="navbar-menu">
                        <div className="navbar-end">
                            <span className="navbar-item">
                            <div className="tabs is-left is-medium">
      <ul>
        <li className='is-active'>
          <Link to="/profile">Profile</Link>
        </li>
        <li className='is-active'>
          <Link to="/public">Public</Link>
        </li>
      </ul>
    </div>
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        {/* TOGGLE FOR SIGNUP AND LOGIN FORMS */}
            {!toggle ?
                <>
                {/* SIGNUP FORM */}
                <div className="container">
                    <AuthForm // props passed to AuthForm.jsx
                        inputs={inputs}
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        buttonText='Signup'
                        errMsg={errMsg}
                        />
                    <p className="help is-warning is-aligned" onClick={()=>{setToggle(prev => !prev)}}>Already a member?</p>
                    </div>
                </>
                :
                <>
                {/* LOGIN FORM */}
                    <AuthForm // props passed to AuthForm.jsx
                        inputs={inputs}
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        buttonText='Login'
                        errMsg={errMsg}
                    />
                <p className="help is-warning is-aligned" onClick={()=>{setToggle(prev => !prev)}}>Not a member?</p>
                </>}
        </div>
    )
}

export default Auth