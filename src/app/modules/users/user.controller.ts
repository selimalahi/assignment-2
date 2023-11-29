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
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { userId } = req.params;
    const numericUserId = parseInt(userId, 10);
     const validatedData = userValidationSchema.parse(userData);
    const result = await UserServices.updateuser(numericUserId, validatedData);
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
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
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const numericUserId = parseInt(userId, 10);
    const orderData = req.body;

    await UserServices.addProductToOrder(numericUserId, orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    if (error instanceof Error && error.message === 'User not found') {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.message,
      });
    }
  }
};



export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const numericUserId = parseInt(userId, 10);
    const orders = await UserServices.getUserOrders(numericUserId);

    if (orders !== undefined) {
      res.json({
        success: true,
        message: 'Order fetched successfully!',
        data: { orders },
      });
    } 
    
  } catch (error) {
    res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
        });
  }
};

const  getTotalOrdersPrice = async (req: Request, res: Response) =>{
  try{
    const {userId} = req.params;
    const numericUserId = parseInt(userId, 10);
    const totalPrice = await UserServices.getToatalPriceOforders(numericUserId);
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully! ",
      data:{
        totalPrice,
      }
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: "User not found",
      error:{
        code: 404,
        description: "User not found!"
      }
    })
  }
}

// const getAllOrdersForUser = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const numericUserId = parseInt(userId, 10);

//     const orders = await UserServices.getAllOrdersForUser(numericUserId);
//     console.log('Orders:', orders); // Log orders

//     res.status(200).json({
//       success: true,
//       message: 'Order fetched successfully!',
//       data: {
//         orders,
//       },
//     });
//   } catch (error: any) {
//     console.error('Error:', error); // Log the error
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message || 'Something went wrong',
//       error: error.error || {},
//     });
//   }
// };

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUsers,
  updateUser,
  deleteUser,
  addProductToOrder,
  // getAllOrdersForUser,
  getUserOrders,
  getTotalOrdersPrice,
};
