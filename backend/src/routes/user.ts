import express from "express";
import { createUser, editUser, getUser, getUsers } from "../controllers/user";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/edit/:id", editUser);
router.get("/:id", getUser);


export default router;
