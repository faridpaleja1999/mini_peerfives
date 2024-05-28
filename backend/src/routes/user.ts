import express from "express";
import { createUser, editUser } from "../controllers/user";

const router = express.Router();

router.post("/", createUser);
router.put("/edit", editUser);

export default router;
