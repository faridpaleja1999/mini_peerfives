import { Request, Response } from "express";
import AppDataSource from "../database/typeormConfig";
import { User } from "../models/user";


export const getUsers = async (
  req: Request,
  res: Response
) => {
try {
  const userRepo = AppDataSource.getRepository(User);
  let users = await userRepo.find();
  return res
  .status(200)
  .json({
    success : true,
    message : "User List",
    data : users
  });
} catch (error) {
  return res
  .status(500)
  .json({
    success : false,
    message : "Server Error",
  });
}
};

export const createUser = async (
  req: Request,
  res: Response
) => {
try {
  const { name } = req.body;
  const userRepo = AppDataSource.getRepository(User);
  let userData = userRepo.create({
    name,
  });
  userData = await userRepo.save(userData);
  return res
  .status(200)
  .json({
    success : true,
    message : "Successfully created",
    data : userData
  });
} catch (error) {
  return res
  .status(500)
  .json({
    success : false,
    message : "Server Error",
  });
}
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const userRepo = AppDataSource.getRepository(User);
    let userData = await userRepo.findOne({ where: { id } });
    if(!userData){
      return res
      .status(404)
      .json({
        success : true,
        message : "User not found",
      });
    }
    userData.name = name;
    userData = await userRepo.save(userData);

    return res
    .status(200)
    .json({
      success : true,
      message : "Successfully updated",
      data : userData
    });
  } catch (error) {
    return res
    .status(500)
    .json({
      success : false,
      message : "Server Error",
    });
  }
};
