import './App.css';
import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import Community from './components/Community.jsx';
import Home from './components/Home.jsx';
import Personal from './components/Personal.jsx';
import Login from './components/Login.jsx';
import SignUpForm from './components/SignupForm';
import Menu from './components/Menu.jsx';



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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
      path="/"
      element={<Layout />}
      >
        <Route index element={<Home menu={Menu}/>} />
        <Route path="login" element={<Login menu={Menu}/>}/>
        <Route path="signup" element={<SignUpForm menu={Menu}/>} />
        <Route path="community" element={<Community menu={Menu}/>} />
        <Route path="personal" element={<Personal menu={Menu}/>} />

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