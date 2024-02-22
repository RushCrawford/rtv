import AuthForm from "./AuthForm"
import { useState } from "react"

const initInputs = { username: '', password: '' }

function Auth() {
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputs(prevInput => ({
            ...prevInput,
            [name]: value
        }))
        console.log(inputs)
    }

    return (
        <div className="container">
            {!toggle ?
                <>
                    <AuthForm
                        inputs={inputs}
                        handleChange={handleChange}
                        buttonText='Signup'
                        // errMsg={errMsg}
                    />
                    <p className="help is-warning" onClick={()=>{setToggle(prev => !prev)}}>Already a member?</p>
                </>
                :
                <>
                    <AuthForm
                        inputs={inputs}
                        handleChange={handleChange}
                        buttonText='Login'
                        // errMsg={errMsg}
                    />
                <p className="help is-warning" onClick={()=>{setToggle(prev => !prev)}}>Not a member?</p>
                </>}
        </div>
    )
}

export default Auth