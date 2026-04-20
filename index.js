require("dotenv").config()
const express = require("express");
const path = require('path')
const mongoose = require('mongoose')
const uri = process.env.MONGO_URL
const http = require("./utils/httpStatusText")
const cors = require("cors")
const app = express();

//swagger
/* const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
        },
        servers: [
            {
                url: 'http://localhost:4000',
            },
        ],
    },
    apis: ["./routes*.js"],
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); */


mongoose.connect(uri).then(() => {
    console.log('server start');
})
app.use(cors()) //allow accses from all origins
app.use(express.json())

//to import all routes and apis use middleware
const coursesRouter = require('./routes/courses.route')
const usersRouter = require('./routes/users.route')

//static middleware for images
app.use('/api/uploads', express.static(path.join(__dirname, "uploads")))

//middlewares
app.use('/api/courses', coursesRouter)
app.use('/api/users', usersRouter)

//global middleware to handle 404 error (not found route)
app.all('*splat', (req, res) => {
    return res.status(404).json({ status: http.ERROR, message: "page not found", code: 404 })
})

//global middleware to handle request with invaild data that work with asyncWrapper (route with invaild data)
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.statusText || http.ERROR, message: error.message, code: error.statusCode || 500, data: null })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('port 4000');
})