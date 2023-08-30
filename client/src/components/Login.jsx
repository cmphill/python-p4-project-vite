import { useState, } from "react";
import { useFormik} from "formik";
import { useNavigate } from "react-router-dom"
import * as yup from 'yup';


export default function Login({ onLogin }) {
    const navigate = useNavigate()
    
    const formSchema = yup.object().shape({
      username: yup.string().max(16, "Must be 16 characters or less").required("Must enter a username"),
      password: yup.string().max(20, "Must be 20 characters or less").required("Must enter a password"),
    })
    const formik = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: formSchema,
      onSubmit: (values) => {
        console.log(values)
        fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values, null, 2),
        }).then(res => {
          if(res.ok) {
            res.json().then(user => onLogin(user))
            navigate('/')
          }
          else {
             Error('invalid credentials')
          }
        })
        
      }
    })
    const errors = formik.errors;
    const arrayErrors = Array.from(errors)
    return (
        <div className="login-container">
            <form onSubmit={formik.handleSubmit}>
                {arrayErrors.map(error => (
                  <h3 style = {{color: "red"}} key={error}>{error.toUpperCase}</h3>
                ))}
                <label>Username</label>
                <input type="text" id='username' name="username" value={formik.values.username} onChange={formik.handleChange} />
                <label>Password</label>
                <input type="password" id='password' name="password" value={formik.values.password} onChange={formik.handleChange} />
                <input type="submit" id='submit' value="Login" />
            </form>
        </div>
    )
}
