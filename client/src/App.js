import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Switch, Route } from 'react-router-dom'
import { UserContext } from './context/UserContext'
import { PrivateRoute } from './routes/PrivateRoute'

function App() {

  const [user,setUser] = useState({});

  useEffect(() => {
    const user_data = localStorage.getItem("user");
    if(user_data) {
      setUser(JSON.parse(user_data))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("user",JSON.stringify(user));
  })

  return (
    <div>
      <UserContext.Provider value={{user,setUser}}>
      <Navbar />
      <Switch>
        <PrivateRoute exact path='/home'>
              <Home />
          </PrivateRoute>
        <Route exact path='/' component={Login} />
      </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
