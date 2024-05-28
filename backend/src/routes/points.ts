import express from "express";
import { deleteTransaction, sharePoints } from "../controllers/points";
import { getPointsHistory, getRewardHistory } from "../controllers/reward";

const router = express.Router();

router.post("/:id/rewards/new", sharePoints);
router.get("/:id/rewards", getRewardHistory);
router.get("/:id/p5", getPointsHistory);
router.delete("/:id/delete/:transactionId", deleteTransaction);

export default router;
