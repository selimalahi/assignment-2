import { User } from './user.interface';
import { UserModel } from './user.model';

const createStudentIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  const result2 = await UserModel.findOne({ userId: result.userId }, { username: 1, fullName: 1, age: 1, email: 1,isActive:1,hobbies: 1,address: 1 });
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
  const result = await UserModel.findOne(
    { userId },
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return result;
};

// const updateuser = async (userId: number, userData: User) => {
//   const result = await UserModel.findByIdAndUpdate(userId, userData, {
//     new: true,
//   });
//   return result;
// };
const updateuser = async (userId: number, userData: User) => {
  const result = await UserModel.findOneAndUpdate({ userId }, userData, {
    new: true,
  });
  return result;
};

// const { fullName, address, ...updateData } = userData;
//   const updatedUserData: Partial<User> = { ...updateData };
//   if (fullName && Object.keys(fullName).length > 0) {
//     Object.keys(fullName).forEach((key) => {
//       const nameKey = `name${key}`;
//       (updatedUserData as any)[nameKey] = fullName[key as keyof typeof fullName];
//     });
//   } 
//   if (address && Object.keys(address).length > 0) {
//     Object.keys(address).forEach((key) => {
//       const nameKey = `name${key}`;
//       (updatedUserData as any)[nameKey] = address[key as keyof typeof address];
//     });
//   } 


const deleteUser = async (userId: number) => {
   await UserModel.findOneAndDelete({ userId });
  return null;

  // if(!isExists){
  //   throw new Error(
  //     "user not exits"
  //   );
    
  // }
};

export const UserServices = {
  createStudentIntoDB,
  getAllUsersFromDB,
  getSingleUsersFromDB,
  updateuser,
  deleteUser,
};
