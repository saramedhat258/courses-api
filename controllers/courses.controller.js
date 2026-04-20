const Course = require('../models/course.model')
let { validationResult } = require('express-validator')
const http = require("../utils/httpStatusText")
const asyncWrapper = require('../middlewares/asyncWrapper')
const AppError = require('../utils/AppError')

const getAllCourses = asyncWrapper(
    async (req, res) => {
        //pagination
        const query = req.query
        const limit = query.limit || 2
        const page = query.page || 1
        const skip = (page - 1) * limit
        //get all courses from db using course model
        const courses = await Course.find({}, { "__v": false }).limit(limit).skip(skip)
        //return unified data using jsend
        res.json({ status: http.SUCCESS, data: { courses } })
    })

const getCourse = asyncWrapper(
    async (req, res, next) => {
        const course = await Course.findById(req.params.id)
        if (!course) {
            //to make the asyncwrapper handle the err
            const err = AppError.create('not found course wrong id', 404, http.FAIL);
            return next(err);
        }
        return res.json({ status: http.SUCCESS, data: { course } })
    })

const addCourse = asyncWrapper(
    async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const err = AppError.create(errors.array(), 400, http.FAIL)
            return next(err)
        }
        //create new course and save it to db
        const course = new Course(req.body)
        await course.save()

        res.status(201).json({ status: http.SUCCESS, data: { course } })
    }
)

const updateCourse = asyncWrapper(
    async (req, res, next) => {
        const courseId = +req.params.id;
        //return finded course not updated one if i want updated course use updateOne
        let course = await Course.findByIdAndUpdate(courseId, {
            $set: { ...req.body }
        })
        return res.status(200).json({ status: http.SUCCESS, data: { course } })
    }
)

const deleteCourse = asyncWrapper(
    async (req, res) => {
        let courseId = req.params.id;
        await Course.deleteOne({ _id: courseId })
        res.status(200).json({ status: http.SUCCESS, data: null })
    })

module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}

