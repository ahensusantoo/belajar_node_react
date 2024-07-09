import express from "express";
import { getUsers, detailUser, createUser, updateUser, deleteUser } from "../controllers/userControllers.js";

const router = express();

// router.get('/', getUsers)

router.route('/').get(getUsers).post(createUser)
router.route('/:id').get(detailUser).put(updateUser).delete(deleteUser)


export default router