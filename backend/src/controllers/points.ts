import { Request, Response } from "express";
import AppDataSource from "../database/typeormConfig";
import { User } from "../models/user";
import { RewardHistory } from "../models/rewardHistory";

export const sharePoints = async (req: Request, res: Response) => {
  try {
    const { id: givenBy } = req.params;
    const { givenTo, points } = req.body;

    const userRepo = AppDataSource.getRepository(User);

    const giver = await userRepo.findOne({ where: { id: givenBy } });
    const recipient = await userRepo.findOne({ where: { id: givenTo } });

    if (giver && recipient && points <= giver.p5Balance) {
      giver.p5Balance -= points;
      recipient.rewardsBalance += points;

      const rewardHistory = new RewardHistory();
      rewardHistory.points = points;
      rewardHistory.givenBy = giver;
      rewardHistory.givenTo = recipient;

      await AppDataSource.manager.save([giver, recipient, rewardHistory]);
      return res.status(200).json({
        success: true,
        message: "Successfully shared points",
        data: rewardHistory,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Sorry! Trasactions can not process.",
        data: {},
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id: userId, transactionId } = req.params;
    const transaction = await AppDataSource.getRepository(
      RewardHistory
    ).findOne({
      where: { id: transactionId },
      relations: ["givenBy", "givenTo"],
    });

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    if (transaction.givenBy.id !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const giver = transaction.givenBy;
    const receiver = transaction.givenTo;

    giver.p5Balance += transaction.points;
    receiver.rewardsBalance -= transaction.points;

    await AppDataSource.manager.save(giver);
    await AppDataSource.manager.save(receiver);
    await AppDataSource.getRepository(RewardHistory).remove(transaction);
    return res.status(200).json({
      success: true,
      message: "Successfully deleted transaction",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
