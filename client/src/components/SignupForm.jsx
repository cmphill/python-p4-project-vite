import React, { useState } from "react";


function SignUpForm ({onLogin}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
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