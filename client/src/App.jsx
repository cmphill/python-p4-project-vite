import './App.css';
import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import CommunityComment from './components/CommunityComment';
import TripComment from './components/TripComment';
import Home from './components/Home.jsx';
import Personal from './components/Personal.jsx';
import Login from './components/Login.jsx';
import SignUpForm from './components/SignupForm';
import Layout from "./components/Layout";
import Community from './components/Community';
import CommunityLayout from './components/CommunityLayout';





function App() {

    const [user, setUser] = useState(null)
    const [trip, setTrip] = useState(null)
    const [communityComments, setCommunityComments] = useState([])
    const [tripComments, setTripComments] = useState([])


    useEffect(() => {
      fetch('/api/communitycomments').then((res) => {
        if (res.ok) {
          res.json().then((comcomments) => {
            setCommunityComments(comcomments)
          })
        }
      })
    })

    useEffect( () => {
        fetch("/api/check_session").then(( response ) => {
            if (response.ok) {
                response.json().then( (user) => {
                    // console.log(user)
                    setUser(user)
                });
            }
        })
    }, [])

    function handleLogin(user) {
        setUser(user);
    }
    function handleLogout() {
        setUser(null);
    }

    function addCommunityComment(new_comment) {
        setCommunityComments([...communityComments, new_comment])
    }

    function handleDeleteCommunityComment(id) {
      const updatedComments = communityComments.filter((comment) => comment.id !== id)
      setMessages(updatedMessages)
    }

    function handleUpdateCommunityComment(id, new_text) {
      const updated_comment = communityComments.map((comment) => {
        if (comment.id === id) {
          return new_text
        } else {
          return comment
        }
      })
      setCommunityComments(updated_comment)
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
            <Route path="community" element={<CommunityLayout/>}>
                <Route path="trip-posts" element={<TripComment/>} />
                <Route path="community-posts" element={<Community 
                comments={communityComments}
                addComment={addCommunityComment}
                deleteComment={handleDeleteCommunityComment}
                updateComment={handleUpdateCommunityComment}

                />} />
            </Route>
            <Route path="personal" element={<Personal user={user}/>} />

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