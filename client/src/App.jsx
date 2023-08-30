import './App.css';
import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import Community from './components/Community.jsx';
import Home from './components/Home.jsx';
import Personal from './components/Personal.jsx';
import Login from './components/Login.jsx';
import SignUpForm from './components/SignupForm';
import Layout from "./components/Layout";




function App() {

    const [users, setUsers] = useState([])

    function handleLogin(user) {
        setUser(user);
    }
    function handleLogout() {
        setUser(null);
    }

    function addUser(user) {
        setUsers(...users, user)
    }
    
    const router = createBrowserRouter(
        createRoutesFromElements(
        <Route
        path="/"
        element={<Layout />}
        >
            <Route index element={<Home />} />
            <Route path="login" element={<Login onLogin={handleLogin} onLogout={handleLogout}/>}/>
            <Route path="signup" element={<SignUpForm addUser={addUser}/>} />
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