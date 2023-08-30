import { useState, } from "react";
import { useFormik} from "formik";
import { useNavigate } from "react-router-dom"
import * as yup from 'yup';

export default function SignUpForm({addUser}) {
    const navigate = useNavigate();
    const [errors, setError] = useState()

    const formSchema = yup.object().shape({
        username: yup.string().max(16, "Must be 16 characters or less").required("Must enter a username"),
        password: yup.string().max(20, "Must be 20 characters or less").required("Must enter a password"),
        password_confirmation: yup.string().max(20, "Must be 20 characters or less").required("Must enter a password confirmation"),
        age: yup.number().required("Must enter an age number"),
        location: yup.string().required("Must enter a location"),
        bio: yup.string().max(500, "Bio must be less than 500 characters")
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            password_confirmation: '',
            age: '',
            location: '',
            bio: '',
        },
        validationSchema: formSchema,         
        onSubmit: (values) => {
            fetch("/users", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(values, null, 2),
            }).then( res => {
                if(res.ok) {
                    res.json().then(user => addUser(user))
                    navigate('/')
                    
                }
                else {
                    res.json().then(errors => setError(errors.message))
                }
            })
        }
    })

    return (
        <div className="signup-container p-10 flex-col flex items-center">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 border-gray-700 border-2 rounded-md p-2">

                <label className="pr-60 border-b-2 border-red-500 font-bold">Username</label>
                <input className="pr-60 border-b-2 border-black" type="text" name="username" placeholder="username" value={formik.values.username} onChange={formik.handleChange} />

                <label className="pr-60 border-b-2 border-red-500 font-bold">Password</label>
                <input className="pr-60 border-b-2 border-black" type="text" name="password" placeholder="password" value={formik.values.password} onChange={formik.handleChange} />

                <label className="pr-60 border-b-2 border-red-500 font-bold">Password Confirmation</label>    
                <input className="pr-60 border-b-2 border-black" type="text" name="password_confirmation" placeholder="Password Confirmation" value={formik.values.password_confirmation} onChange={formik.handleChange} />


                <label className="pr-60 border-b-2 border-red-500 font-bold">Location</label>
                <input className="pr-60 border-b-2 border-black" type="text" name="location" placeholder="location" value={formik.values.location} onChange={formik.handleChange} />


                <label className="pr-60 border-b-2 border-red-500 font-bold">Age</label>
                <input className="pr-60 border-b-2 border-black" type="text" name="age" placeholder="age" value={formik.values.age} onChange={formik.handleChange} />


                <label className="pr-60 border-b-2 border-red-500 font-bold">Bio</label>
                <input className="pr-60 border-b-2 border-black" type="text" name="bio" placeholder="bio" value={formik.values.bio} onChange={formik.handleChange} />

                <input className="border-black border-2 rounded-md" type="submit" />

            </form>

            <div className="flex flex-col gap-2 mt-2">
                {formik.errors&& Object.values(formik.errors).map(error => <h3  style={{color: "red"}}>{error.toUpperCase()}</h3>)}
            </div>
        </div>
    )
}