import { Request, Response } from "express";
import AppDataSource from "../database/typeormConfig";
import { User } from "../models/user";

export const getRewardHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.receivedRewards", "rewardHistory")
      .leftJoinAndSelect("rewardHistory.givenBy", "givenByUser")
      .select([
        "user.id",
        "user.name",
        "user.p5Balance",
        "user.rewardsBalance",
        "rewardHistory.id",
        "rewardHistory.date",
        "rewardHistory.points",
        "givenByUser.id",
        "givenByUser.name",
      ])
      .where("user.id = :id", { id })
      .getOne();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        data: { user, rewardsBalance: user.rewardsBalance },
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getPointsHistory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.givenRewards", "rewardHistory")
      .leftJoinAndSelect("rewardHistory.givenTo", "givenToUser")
      .select([
        "user.id",
        "user.name",
        "user.p5Balance",
        "user.rewardsBalance",
        "rewardHistory.id",
        "rewardHistory.date",
        "rewardHistory.points",
        "givenToUser.id",
        "givenToUser.name",
      ])
      .where("user.id = :id", { id })
      .getOne();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "Successfully got the list",
        data: user,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
