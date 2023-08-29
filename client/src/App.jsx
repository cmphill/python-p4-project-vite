import './App.css';
import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Community from './components/Community.jsx';
import Home from './components/Home.jsx';
import Personal from './components/Personal.jsx';
import Login from './components/Login.jsx';
<<<<<<< HEAD

=======
import SignUpForm from './components/SignupForm';
import Menu from './components/Menu.jsx';
import Layout from './components/Layout.jsx';
>>>>>>> d18612d (troubleshooting)


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
<<<<<<< HEAD

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    })
    .then( () => console.log(user))
  }, [])
  

=======
  
>>>>>>> d18612d (troubleshooting)
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
<<<<<<< HEAD
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<SignupForm />} />
        <Route path="community" element={<Community />} />
        <Route path="personal" element={<Personal />} />
=======
        <Route path="login" element={<Login menu={Menu} onLogin={handleLogin} onLogout={handleLogout}/>}/>
        <Route path="signup" element={<SignUpForm menu={Menu}/>} />
        <Route path="community" element={<Community menu={Menu}/>} />
        <Route path="personal" element={<Personal menu={Menu}/>} />
>>>>>>> d18612d (troubleshooting)

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