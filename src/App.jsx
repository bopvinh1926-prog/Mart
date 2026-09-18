import Form from './components/Form/Form'
import { useState } from 'react'
import './App.css'
import Management from './components/Management/CodeManagement/Sell/Management.jsx'
function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const stored = localStorage.getItem("loggedIn");
    return stored === "true";
  });
  const handleLogin =()=>{
    setLoggedIn(true);
    localStorage.setItem("loggedIn",JSON.stringify(true))
  }
  const handleLogout =()=>{
    setLoggedIn(false);
    localStorage.setItem("loggedIn",JSON.stringify(false))
  }
  return (
    <>
        {/*<Management/>*/}
        { <Form onLogin={handleLogin} login={loggedIn} onLogout={handleLogout}/> }

    </>
  )
}

export default App
