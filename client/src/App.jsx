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

    const [user, setUser] = useState(null)

    useEffect( () => {
        fetch("/api/check_session").then(( response ) => {
            if (response.ok) {
                response.json().then( (user) => {
                    // console.log(user)
                    setUser(user)
                });;
            }
        })
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
        element={<Layout onLogout={handleLogout} user={user}/>}
        >
            <Route index element={<Home />} />
            <Route path="login" element={<Login onLogin={handleLogin}/>}/>
            <Route path="signup" element={<SignUpForm onSignup={handleLogin}/>} />
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