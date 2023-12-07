/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import {
  User,
  UserAddress,
  UserFullName,
  UserMethods,
  UserModels,
  UserOrders,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userFullnameSchema = new Schema<UserFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const userAddressSchema = new Schema<UserAddress>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const userOrderSchema = new Schema<UserOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<User, UserModels, UserMethods>({
  userId: {
    type: Number,    
    required: [true, 'User Id is requried'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'User Id is requried'],
    unique: true,    
  },
  password: { type: String,  required: [true, 'User Id is requried'], },
  fullName: {
    type: userFullnameSchema,
  },
  age: { type: Number },
  email: { type: String, required: true },
  isActive: { type: Boolean },
  hobbies: [{ type: String }],
  address: {
    type: userAddressSchema,
    required: true,
  },
  orders: {
    type: [userOrderSchema],
    
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// custom inastance method
userSchema.methods.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};



// userSchema.statics.isExistsUser = async function(userId: number) {
//   const userExisting = await this.findOne({ userId });
//   return userExisting;
// };

export const UserModel = model<User, UserModels>('User', userSchema);
