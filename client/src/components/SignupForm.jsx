<<<<<<< HEAD
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
=======
import { useState } from "react";
import { Formik, Form, Field } from "formik";

function SignUpForm() {
>>>>>>> 93cae28 (formik)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
<<<<<<< HEAD
<<<<<<< HEAD
  const [age, setAge]
}
=======
=======
  const [location, setLocation] = useState("");
>>>>>>> f088fbc (stash)
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          response.json().then((user) => onLogin(user));
        } else {
          response.json().then((err) => setErrors(err.errors));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Formik
      initialValues={{
        username,
        password,
        passwordConfirmation,
        location,
        age,
        bio
      }}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <Form>
          <Field
            name="username"
            label="Username"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Field
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Field
            name="passwordConfirmation"
            label="Password Confirmation"
            type="password"
            value={values.passwordConfirmation}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Field
            name="location"
            label="Location"
            type="text"
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Field
            name="age"
            label="Age"
            type="number"
            value={values.age}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Field
            name="bio"
            label="Bio"
            type="text"
            value={values.bio}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading" : "Sign up"}
          </button>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </Form>
      )}
    </Formik>
  );
}

export default SignUpForm;
>>>>>>> d988350 (added the menu and some addl routing)
