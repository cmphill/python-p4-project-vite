import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
export const SignupForm = () => {
  const [customers, setCustomers] = useState([{}]);
  const [refreshPage, setRefreshPage] = useState(false);
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

  useEffect(() => {
    console.log("FETCH! ");
    fetch("/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        console.log(data);
      });
  }, [refreshPage]);

  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    name: yup.string().required("Must enter a name").max(15),
    age: yup
      .number()
      .positive()
      .integer()
      .required("Must enter age")
      .typeError("Please enter an Integer")
      .max(125),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.status == 200) {
          setRefreshPage(!refreshPage);
        }
      });
    },
  });

  return (
    <div>
      <h1>Customer sign up form</h1>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="email">Email Address</label>
        <br />
        <input
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <p style={{ color: "red" }}> {formik.errors.email}</p>
        <label htmlFor="name">Name</label>
        <br />

        <input
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>

        <label htmlFor="age">age</label>
        <br />

function SignUpForm ({onLogin}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
<<<<<<< HEAD
  const [age, setAge]
}
=======
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



function handleSubmit(e) {
  e.preventDefault();
  setErrors([])
  setIsLoading(true);
  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password,
      password_confirmation: passwordConfirmation,
      age: age,
      bio: bio
    }),
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
      <Label name='username'>Username</Label>
      <Input
      type='text'
      value={username}
      onChange={(e) => setUsername(e.target.value)} />
    </FormField>
    <FormField>
      <Label name='password'>Password</Label>
      <Input
      type='password'
      value={password}
      onChange={(e) => setPassword(e.target.value)} />
    </FormField>
    <FormField>
      <Label name='passwordConfirmation'>Password Confirmation</Label>
      <Input
      type='password'
      value={passwordConfirmation}
      onChange={(e) => setPasswordConfirmation(e.target.value)} />
    </FormField>
    <FormField>
      <Label name='age'>Age</Label>
      <Input
      type='number'
      value={age}
      onChange={(e) => setAge(e.target.value)} />
    </FormField>
    <FormField>
      <Label name='bio'>Bio</Label>
      <Input
      type='text'
      value={bio}
      onChange={(e) => setBio(e.target.value)} />
    </FormField>
    <FormField>
      <Button type='submit'> {isLoading ? "Loading" : "Sign up"}</Button>
    </FormField>
    <FormField>
      {errors.map((error) => (
        <Error key={error}>{error}</Error>
      ))}
    </FormField>
  </form>
)
}

export default SignUpForm;
>>>>>>> d988350 (added the menu and some addl routing)
