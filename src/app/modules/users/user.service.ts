/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import config from '../../config';
import { User } from './user.interface';
import { UserModel } from './user.model';
import bcrypt from 'bcrypt';

const createStudentIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  const result2 = await UserModel.findOne(
    { userId: result.userId },
    {
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      isActive: 1,
      hobbies: 1,
      address: 1,
    },
  );
  return result2;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return result;
};

const getSingleUsersFromDB = async (userId: number) => {
  const user = new UserModel();
  if (!(await user.isUserExists(userId))) {
    throw new Error('User not found');
  }

  const result = await UserModel.findOne(
    { userId },
    { userId: 1, username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return result;
};

const updateUser = async (userId: number, userData: User) => {
  const user = new UserModel();
  if (!(await user.isUserExists(userId))) {
    throw new Error('User not found');
  }
  if (userData.password) {
    userData.password = await bcrypt.hash(
      userData.password,
      Number(config.bcrypt_salt_rounds),
    );
  }

  const result = await UserModel.findOneAndUpdate({ userId }, userData, {
    new: true,
    runValidators: true,
  });

  if (result) {
    const { password, ...resultWithoutPassword } = result.toObject();
    return resultWithoutPassword;
  }

  return result;
};

const deleteUser = async (userId: number) => {
  const user = new UserModel();
  if (!(await user.isUserExists(userId))) {
    throw new Error('User not found');
  }
  await UserModel.findOneAndDelete({ userId });
  return null;
};

const addProductToOrder = async (
  userId: number,
  orderData: { productName: string; price: number; quantity: number },
) => {
  try {
    const user = await UserModel.findOne({ userId });

    if (!user) {
      throw new Error('User not found');
    }
    if (!user.orders) {
      user.orders = [];
    }
    user.orders.push({
      productName: orderData.productName,
      price: orderData.price,
      quantity: orderData.quantity,
    });

    await user.save();

    return null;
  } catch (error) {
    throw error;
  }
};

export const getUserOrders = async (userId: number) => {
  try {
    const user = await UserModel.findOne({ userId });
    if (user) {
      const existingUser = await user.isUserExists(userId);
      if (existingUser) {
        const orders = existingUser.orders;

        if (orders && orders.length > 0) {
          return orders;
        } else {
          return [];
        }
      }
    } else {
      const error = new Error('User not found');
      (error as any).code = 404;
      throw error;
    }
  } catch (error) {
    throw new Error('Error fetching user orders');
  }
};

const getToatalPriceOforders = async (userId: number) => {
  try {
    const user = await UserModel.findOne({ userId });

    if (user) {
      const existingUser = await user.isUserExists(userId);
      if (existingUser) {
        const totalPrice =
          existingUser.orders?.reduce(
            (sum, order) => sum + order.price * order.quantity,
            0,
          ) || 0;

        const totalPrice2 = parseFloat(totalPrice.toFixed(2));
        return totalPrice2;
      }
    } else {
      const error = new Error('User not found');
      (error as any).code = 404;
      throw error;
    }
  } catch (error) {
    throw new Error('User Not Found');
  }
};

export const UserServices = {
  createStudentIntoDB,
  getAllUsersFromDB,
  getSingleUsersFromDB,
  updateUser,
  deleteUser,
  addProductToOrder,
  getUserOrders,
  getToatalPriceOforders,
};
