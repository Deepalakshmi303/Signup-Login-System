
# Signup & Login System (MERN Stack)

A simple and secure Signup & Login authentication system built using:

* Frontend: React
* Backend: Node.js + Express
* Database: MongoDB (Compass)
* Authentication: Express Sessions + Cookies

This project allows users to register, login, and access a protected dashboard only after proper authentication.


## Features

✔ User Signup
✔ User Login
✔ Secure Session Authentication
✔ Password Hashing (bcrypt)
✔ Dashboard accessible only after login
✔ Logout system
✔ MongoDB Compass / Atlas support

## Technologies Used

Frontend

* React.js
* Axios
* React Router

Backend

* Node.js
* Express.js
* express-session
* bcrypt (for password hashing)
* Mongoose (MongoDB ORM)

## Installation

frontend - npm init -y
npm install react-router-dom axios 
npm start


## MongoDB Setup

### Using MongoDB Compass:

1. Open Compass
2. Create a new database:
   Database name,collection
3. Start the backend → it will auto-connect


## API Endpoints

### POST /signup

Registers a new user.

### POST /login

Authenticates and creates a session.

### GET /dashboard

Accessible only when logged in.

### **GET /logout**

Destroys the user's session.
