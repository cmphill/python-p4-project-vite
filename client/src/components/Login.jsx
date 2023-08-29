import { Form, FormField, Error }from '@formfield/react/dist/index' ;
import {useState} from 'react';
import { NavLink, Outlet } from "react-router-dom";

function Login({ onLogin, onLogout}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => onLogin(user))
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }
    function handleLogout() {
        setIsLoading(true);
        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                onLogout()
            } 
        })
    }
    return (
            <Form onSubmit={handleSubmit}>
            <FormField>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </FormField>
            <FormField>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormField>
            <FormField>
                <button>{isLoading ? "Loading..." : "Login"} </button>
            </FormField>
            <FormField>
                {errors.map((err) => (<Error key={err}>{err}</Error>))}
            </FormField>
            </Form>
    )
}

export default Login