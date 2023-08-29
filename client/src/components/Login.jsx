import React, { useState } from "react";

function Login({ onLogin }) {
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
    return (
        <form onSubmit={handleSubmit}>
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
                <Button>{isLoading ? "Loading..." : "Login"} </Button>
            </FormField>
            <FormField>
                {errors.map((err) => (<Error key={err}>{err}</Error>))}
            </FormField>
        </form>
    )
}

export default Login