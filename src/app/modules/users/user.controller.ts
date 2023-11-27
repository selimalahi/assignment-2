/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validaton';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodParseData = userValidationSchema.parse(user);
    const result = await UserServices.createStudentIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
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
    const numericUserId = parseInt(userId, 10);
    const result = await UserServices.getSingleUsersFromDB(numericUserId);

    res.status(200).json({
      success: true,
      message: ' Retrieve a specific user by ID',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message ||" something Went wrong",
    })
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { userId } = req.params;
    const numericUserId = parseInt(userId, 10);
    // const validatedData = userValidationSchema.parse(userData);
    const result = await UserServices.updateuser(numericUserId, userData);
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const numericUserId = parseInt(userId, 10);
    const result = await UserServices.deleteUser(numericUserId);
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUsers,
  updateUser,
  deleteUser,
};
