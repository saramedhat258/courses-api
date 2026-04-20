# First API 🚀

A RESTful API built with Node.js, Express, MongoDB, and Mongoose for managing users and courses with authentication, authorization, and image upload functionality.

---

## 📌 Features

- User registration and login with JWT authentication
- Role-based access control (Admin / Manager / User)
- Full CRUD operations for Courses
- Pagination for courses
- Image upload using Multer
- Password hashing with bcryptjs
- Input validation using express-validator
- Global error handling middleware
- Clean MVC architecture

---

## 🛠️ Tech Stack

Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Multer, express-validator, dotenv, cors

---

## 📁 Project Structure

controllers/  
middlewares/  
models/  
routes/  
utils/  
uploads/  
index.js  

---

## 🔐 Authentication

### Register
POST /api/users/register
---

### Login
POST /api/users/login
---

## 📚 Courses API

### Get all courses
GET /api/courses

### Get course by id
GET /api/courses/:id

### Add course (Protected)
POST /api/courses

### Update course
PATCH /api/courses/:id

### Delete course (Admin / Manager only)
DELETE /api/courses/:id 

---

## 🚀 Installation

git clone <repo-url>  
cd first-api  
npm install  
npm run dev  
