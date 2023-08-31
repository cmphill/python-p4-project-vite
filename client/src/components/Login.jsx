import { useState, } from "react";
import { useFormik} from "formik";
import { useNavigate, NavLink } from "react-router-dom"
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
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values, null, 2),
        }).then(res => {
          if(res.ok) {
            res.json().then(user => onLogin(user))
            navigate('../personal')
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
        <div className="login-container p-10 flex flex-col items-center">
            <form className="p-6 flex flex-col gap-3 bg-red-300 border-red-800 border-2 rounded-md" onSubmit={formik.handleSubmit}>
                {arrayErrors.map(error => (
                  <h3 style = {{color: "red"}} key={error}>{error.toUpperCase}</h3>
                ))}
                <label className="pr-60 border-b-2 border-red-500 font-bold">Username</label>
                <input className="rounded" type="text" id='username' name="username" value={formik.values.username} onChange={formik.handleChange} />

                <label className="pr-60 border-b-2 border-red-500 font-bold">Password</label>
                <input className="rounded" type="password" id='password' name="password" value={formik.values.password} onChange={formik.handleChange} />

                <input className="btn border-black border-2 rounded-md" type="submit" id='submit' value="Login" />
            </form>
            <div className="text-md flex gap-2 m-3">
              <p className="font-bold">Not signed up?</p>
              <NavLink className="btn-secondary font-bold text-red-600" to="../signup"> Create an Account </NavLink>
            </div>
        </div>
    )
}
