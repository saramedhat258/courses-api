const express = require("express")
const controllers = require("../controllers/courses.controller");
const { validationSchema } = require("../middlewares/validationSchema");
const verifyToken = require("../middlewares/verifyToken");
const userRoles = require("../utils/roles");
const allowedTo = require("../middlewares/allowedTo");
const router = express.Router();


//router.get('/', controllers.getAllCourses)
/* router.post('/', [
    body('title').notEmpty().withMessage("title is required").isLength({ min: 2 }).withMessage("title is at least 2 chars"),
    body('price').notEmpty().withMessage("price is required")
], controllers.addCourse) */

//get and post at the same url
router.route('/')
    .get(controllers.getAllCourses)
    .post(verifyToken, validationSchema(), controllers.addCourse)


//router.get('/:id', controllers.getCourse)
//router.patch('/:id', controllers.updateCourse)
//router.delete('/:id', controllers.deleteCourse)

//get ,patch and delete at the same url
router.route('/:id')
    .get(controllers.getCourse)
    .patch(controllers.updateCourse)
    .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), controllers.deleteCourse)

module.exports = router