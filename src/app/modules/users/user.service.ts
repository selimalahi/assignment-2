import { User } from './user.interface';
import { UserModel } from './user.model';

const createStudentIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUsersFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

const updateuser = async (userId: string, userData: User) => {
  const result = await UserModel.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUser = async (userId: string) => {
  const result = await UserModel.findByIdAndUpdate(userId);
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  getAllUsersFromDB,
  getSingleUsersFromDB,
  updateuser,
  deleteUser,
};
