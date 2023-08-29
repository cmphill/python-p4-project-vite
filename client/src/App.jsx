import './App.css';
import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Community from './components/Community.jsx';
import Home from './components/Home.jsx';
import Personal from './components/Personal.jsx';
import Login from './components/Login.jsx';



function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    })
  }, [])

  if (!user) return <Login onLogin={setUser}/>

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    })
    .then( () => console.log(user))
  }, [])
  

  function handleLogin(user) {
    setUser(user);
  }
  function handleLogout() {
    setUser(null);
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
      path="/"
      element={<Layout />}
      >
        <Route index element={<Home />} />
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<SignupForm />} />
        <Route path="community" element={<Community />} />
        <Route path="personal" element={<Personal />} />

      </Route>
      
  )
  )
  return (
    <div >
      <RouterProvider router={router}/>
    </div>
    
  );
}

export default App;