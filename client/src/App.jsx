import './App.css';
import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import CommunityComment from './components/CommunityComment';
import TripMain from './components/TripMain';
import Home from './components/Home.jsx';
import Personal from './components/Personal.jsx';
import Login from './components/Login.jsx';
import SignUpForm from './components/SignupForm';
import Layout from "./components/Layout";
import Community from './components/Community';
import CommunityLayout from './components/CommunityLayout';
import { tripLoader } from './components/TripMain';





function App() {

    const [user, setUser] = useState(null)
    const [comment, setComments] = useState(null)
    const [communityComments, setCommunityComments] = useState([])

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

    useEffect(() => {
        fetch('/api/communitycomments').then((res) => {
          if (res.ok) {
            res.json().then((comcomments) => {
              setCommunityComments(comcomments)
            })
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
      setCommunityComments(updatedComments);
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
                <Route path="trip-posts" loader={tripLoader} element={<TripMain />} />
                <Route path="community-posts" element={<Community 
                comments={communityComments}
                addComment={addCommunityComment}
                deleteComment={handleDeleteCommunityComment}
                updateComment={handleUpdateCommunityComment}
                user_id={user ? user.id : null}
                user={user}

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