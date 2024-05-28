import express from "express";
import { createUser, editUser, getUsers } from "../controllers/user";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/edit/:id", editUser);

export default router;
