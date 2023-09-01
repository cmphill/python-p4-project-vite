# Project Name
Author: [Jerrick Ee](https://github.com/Jerricke) & [Cooper Phillips](https://github.com/cmphill)
More Info: [Github](https://github.com/cmphill/python-p4-project-vite)
## Table of Contents
- [Triply](#Triply)
  - [Table of Contents](#table-of-contents)
  - [Intro](#intro)
  - [Setup](#setup)
    - [Dependencies](#dependencies)
    - [Start Servers](#start-servers)
  - [Models](#models)
  - [Routes](#routes)
    - [/home](#route1\)
      - [Read](#method1-1)
    - [/communitycomments](#route2)
      - [Create](#method1-2)
      - [Read](#method2-2)
      - [Update](#method3-2)
      - [Delete](#method4-2)
    - [/personal](#route3)
      - [Read](#method1-3)
    - [/signup](#route4)
      - [Create](#method1-4)
      -[Read]
    - [/login](#route5)
    - [Create](#method1-5)
    - [Read](#method2-5)
    - [Delete](#method3-5)
  - [Credits](#credits)
## Intro
{intro}
In this repo:
  - {Signup}: {Register to join the website}
  - {Login}: {Sign in to your account}
  - {Comment}: {Comment on trips}


{A website to track your journeys and connect with other roamers.}

## Setup
### Dependencies
To download the dependencies for the frontend and backend, run:
```bash
pipenv install
pipenv shell
npm install --prefix client
```
### Start Servers
You can run your Flask API on localhost:{5555} by running:
```bash
python server/app.py
```
You can run your React app on localhost:{3000} by running:
```bash
npm start --prefix client
```
***
## Models
![Database Diagram](https://www.figma.com/file/tfZqqlMuEgzoeUXu221Yte/project-board?type=whiteboard&node-id=0-1&t=oLNlo0H9eIsvKl0j-0)

The file `server/models.py` defines the model classes.

Use the following commands to create the initial database app.db:
```python
export FLASK_APP=server/app.py
flask db init
flask db upgrade head
```
The tables have the same relationships as shown in the ER Diagram:
- A {user} has {many} {community_comments}
- A {user} has {many} {trips} through {signups}
- A {trip} has {many} {users} through {signups}
- A {trip} has {many} {comments}
- A {trip} has {many} {signups}

**Serialization is used to limit the recursion depth.**

To migrate and seed the database:
```python
flask db revision --autogenerate -m 'message'
flask db upgrade head
python server/seed.py
```

***
## Routes

The Flask api provided has the following routes

### /home
{The landing place}
#### Read
  - Description: {The home page describes the site and is the destination after logging out}
### /community-posts

#### Create
  - Description: {create a new comment}
    There is a text box, validated with formik formSchema that requires text, and does not allow the input to exceed 500 characters
 
#### Read
  - Description: {read existing comments}
  The comments will appear in the list on the community posts page, and the comment cards render with the username and a time stamp provided by the backend.
#### Update
  - Description: {update existing comments}
  Updating validates that the session user id matches the user id of comment poster before allowing updates to be made. There is ternary logic that hides the update button in addition to validations in the patch method itself. 

#### Delete
  - Description: {delete existing comments}
  Deleting likewise validates that the session user id matches the user id of comment poster. The delete button only appears when this condition is true. 

### /login

#### Create
  -Description: {update the session to the current user}
  The username is validated and the password is checked against the password hash. Once the login request has posted, the session will be set to the current user.  Ternary logic changes the login button to a logout button after a successful login. 

#### Read
  -Description: the /personal page allows the user to view their profile associated with their session. This includes the bio, username, profile icon, miles traveled, and trips.

#### Delete
  -Description: the logout button deletes the user id from the session and thus logs out. On the backend there is an open access list that allows visitors to visit the public pages without having to log in, but will prompt them to log in to view the personal page.

### /trip-posts
-Description: the trip posts are associated with a user and trip. Currently, they are automatically generated from faker. 


---
## Credits
- [Readme Template](https://github.com/pithlyx/readme) : [Cody 'Pithlyx' Roberts](https://github.com/pithlyx)
- [Phase 4 Project Template](https://github.com/darkcohiba/python-p4-project-template): [Sam Waters](https://github.com/darkcohiba)
