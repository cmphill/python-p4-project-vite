import './App.css';
import { SignupForm } from './components/SignupForm';
import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import Community from './components/Community.jsx';
import Home from './components/Home.jsx';
import Personal from './components/Personal.jsx';
import Login from './components/Login.jsx';




function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
      path="/"
      element={<Layout />}
      >
        <Route index element={<Home />} />
        <Route path="login" element={<Login onLogin={handleLogin} onLogout={handleLogout}/>}/>
        <Route path="signup" element={<SignUpForm/>} />
        <Route path="community" element={<Community/>} />
        <Route path="personal" element={<Personal/>} />

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