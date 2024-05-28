import express from "express";
import pointRoute from "./points";
import userRoute from "./user";

const router = express.Router();

router.use("/user", userRoute);
router.use("/point", pointRoute);

export default router;
