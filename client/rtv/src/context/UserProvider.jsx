import { createContext, useReducer } from "react"
import axios from 'axios'

export const UserContext = createContext() // create and export an instance of context 

const userAxios = axios.create() // creating our own version of axios
userAxios.interceptors.request.use(config => { // configuring userAxios for our purposes
    const token = localStorage.getItem('token') // retrieve token from localStorage and save it in variable
    config.headers.Authorization = `Bearer ${token}` // adds Authorization and Bearer 'token' to the request header
    return config // returns the new object including the Authorization and token
})

const initState = { // creating initial state object
    user: JSON.parse(localStorage.getItem('user')) || {}, // set user to whats in localStorage or an empty object
    token: localStorage.getItem('token') || '', // set token to whats in localStorage or an empty string
    issues: [],
    errMsg: ''
}

function userReducer(userState, action) { // state management function that takes the current userState and an action object
    switch (action.type) { // switch statement that branches depending on the type property of the action
        case 'received-user-data': { 
            return { // updates the user object and token in userState with new data
                ...userState,
                user: action.newUser,
                token: action.newToken
            }
        }
        case 'auth-err': {
            return {
                ...userState,
                errMsg: action.payload
            }
        }
        case 'logout': {
            return {
                user: '',
                token: '',
                issues: [],
                errMsg: ''
            }
        }
        default: // a default case to handle actions that dont match the above cases
            return userState
    }
}

function UserProvider(props) {
    const [ userState, dispatch ] = useReducer(userReducer, initState) // holds current state of user data, dispatch function sends actions to reducer

    const signup = async (credentials)=> { // pass in user data as credentials
        try {
            const res = await axios.post('/api/auth/signup', credentials)
            const { user, token } = res.data // pull user and token out of res.data
            localStorage.setItem('token', token) // store token in localStorage
            localStorage.setItem('user', JSON.stringify(user)) // store user data in localStorage
            dispatch({ type: 'received-user-data', newToken: token, newUser: user }) // send token and user data to reducer to update state
        } catch (err) {
            handleAuthErr(err.response.data.errMsg) // shows error message 'username already taken'
        }
    }

    const login = async (credentials)=> {
        try {
            const res = await axios.post('/api/auth/login', credentials)
            const { user, token } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({ type: 'received-user-data', newToken: token, newUser: user })
        } catch (err) {
            handleAuthErr(err.response.data.errMsg)
        }
    }

    const logout = ()=> {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        dispatch({ type: 'logout' })
    }

    const handleAuthErr = (errMsg)=> {
        dispatch({ type: 'auth-err', payload: errMsg})
    }

console.log(userState)
    return(
        <UserContext.Provider // provides children components access to userState and action functions
            value={{
                userState,
                signup,
                login,
                logout
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider