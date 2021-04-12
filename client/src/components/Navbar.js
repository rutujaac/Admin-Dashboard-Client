import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'


const Navbar = () => {

    const context = useContext(UserContext)
    console.log("Navbar"+context.isAuth)

    const logoutUser = () => {
        if(window.confirm('Are you sure you want to logout?')) {
            context.setUser({
                isAuth: false,
                token: "",
                username: "",
                darkMode: false
            })
        }
    }
  
    return (
        <div>
            <nav className="navbar">
                <Link className="navbar-brand" to='/dashboard'>Smart Surveillance</Link>
                <label className="switch">
                </label>
               
                {(context.user && context.user.isAuth) ? <button className="btn btn-link" onClick={logoutUser}>Logout</button> : ""}
            </nav>
        </div>
    )
}

export default Navbar
