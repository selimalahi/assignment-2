import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { Response } from 'express';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const result = await UserServices.createStudentIntoDB(userData);

    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Retrieve a list of all users',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getSingleUsersFromDB(userId);

    res.status(200).json({
      success: true,
      message: ' Retrieve a specific user by ID',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUsers,
  
};
