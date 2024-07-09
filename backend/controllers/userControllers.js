import asyncHandler from "express-async-handler"

// @desc Get All Users
// route GET /api/users
// @access Public
const getUsers = asyncHandler(async(req,res) => {
    res.send('GET ALL USERS')
})

// @desc Get Detail Users
// route GET /api/users/id
// @access Public
const detailUser = asyncHandler(async(req,res) => {
    res.send('DETAIL USERS')
})

// @desc Create New Users
// route POST /api/users
// @access Public
const createUser = asyncHandler(async(req,res) => {
    res.send('CREATE USERS')
})

// @desc Update Users
// route PUT /api/users/id
// @access Public
const updateUser = asyncHandler(async(req,res) => {
    res.send('UPDATE USERS')
})

// @desc Delete Users
// route DELETE /api/users/id
// @access Public
const deleteUser = asyncHandler(async(req,res) => {
    res.send('DELETE USERS')
})

export {
    getUsers, detailUser, createUser, updateUser, deleteUser
}