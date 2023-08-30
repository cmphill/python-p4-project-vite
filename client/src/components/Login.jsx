import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

function Login({ onLogin, onLogout }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values) => {
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password
      })
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user))
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    })
  };

  return (
    <Formik
      initialValues={{
        username: username,
        password: password
      }}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched }) => (
        <Form>
          <Field
            name="username"
            label="Username"
            placeholder="Enter your username"
            value={values.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Field
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={values.password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
          {errors.length > 0 && (
            <div>
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default Login;