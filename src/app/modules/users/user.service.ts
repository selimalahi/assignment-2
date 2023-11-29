/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import { User } from './user.interface';
import { UserModel } from './user.model';

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
    { username: 1, fullName: 1, age: 1, email: 1, address: 1, orders: 1 },
  );
  return result;
};

const updateuser = async (userId: number, userData: User) => {
  const user = new UserModel();
  if (!(await user.isUserExists(userId))) {
    throw new Error('User not found');
  }

  const result = await UserModel.findOneAndUpdate({ userId }, userData, {
    new: true,
    runValidators: true,
  });
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
        // return orders;

        if(orders && orders.length > 0){
          return orders;
        }else{
          return [];
        }
      }
    }    
    else {
      const error = new Error('User not found');
      (error as any).code = 404;
      throw error;
    }
  } catch (error) {
    throw new Error('Error fetching user orders');
  }
};

// Calculate Total Price of Orders for a Specific User

const getToatalPriceOforders = async (userId: number) => {
  try{
    const user = await UserModel.findOne({ userId });
   
  if (user) {
    const existingUser = await user.isUserExists(userId);
    if (existingUser) {      
      const TotalPrice =
        existingUser.orders?.reduce(
          (sum, order) => sum + order.price * order.quantity,
          0,
        ) || 0;
      return TotalPrice;
    }
  }else {
    const error = new Error('User not found');
    (error as any).code = 404;
    throw error;
  }
  }catch(error){
    throw new Error('User Not Found');
  }
};

export const UserServices = {
  createStudentIntoDB,
  getAllUsersFromDB,
  getSingleUsersFromDB,
  updateuser,
  deleteUser,
  addProductToOrder,
  getUserOrders,
  getToatalPriceOforders,
};
