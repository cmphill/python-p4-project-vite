import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';


function SignUpForm ({onLogin}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values) => {
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
          {/* {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))} */}
        </Form>
      )}
    </Formik>
  );
}

export default SignUpForm;