import React, { useState, useContext } from 'react'
import loginimg  from '../images/login-img.png'
import { history, useHistory } from 'react-router'
import axios from 'axios'
import { UserContext } from '../context/UserContext'

const Login = () => {
    const [user, setUser] = useState({})
    const context = useContext(UserContext)
    const history = useHistory()
    const [errorMessage, setErrorMessage] = useState("")

    const inputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
        //console.log(e.target.value)
    }

    const submitForm = (e) => {
        e.preventDefault()
        setErrorMessage("")
        axios.post("http://localhost:3000/login", {email:user.email, password: user.password})
        .then(result => {
            if(result.status == 200) {
                console.log(result.data.accessToken)
                context.setUser({
                    isAuth: true,
                    token: result.data.accessToken,
                    user: user.email
                })
                history.push('/home')
            }
            else {
                console.log("User does not exist")
            }
        })
        .catch(error => {
            console.log(error.response.data)
            setErrorMessage(error.response.data)
        })
    }

    return (
        <div className="container">
        
        <img src={loginimg} alit="login" height="310px" width="400px" className="img-fluid"/>
        <div className="mb-3">
        <p className={errorMessage!= "" ? "message-block" : "" }>{errorMessage}</p>
        <input type="text" className="form-control" name="email" onChange={inputChange} id="formGroupExampleInput" placeholder="Email" />
        </div>
        <div className="mb-3">
       
        <input type="password" className="form-control" name="password" onChange={inputChange} id="formGroupExampleInput2" placeholder="Password" />
        </div>
        <button type="submit" onClick={submitForm} className="btn btn-primary btn-block">LOGIN</button>
        </div>
    )
}

export default Login
