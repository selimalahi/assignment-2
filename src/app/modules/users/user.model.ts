/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { User, UserAddress, UserFullName, UserMethods, UserModels, UserOrders } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
// import { config } from 'dotenv';
const userFullnameSchema = new Schema<UserFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const userAddressSchema = new Schema<UserAddress>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const userOrderSchema = new Schema<UserOrders>([{
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
}]);

const userSchema = new Schema<User, UserModels, UserMethods>({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
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
  orders:{
    type:[ userOrderSchema],
    default: []
  },
});


userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds));
  next();
    
})
userSchema.post('save', function (doc, next) {
  doc.password= ''
  next();
})


userSchema.methods.isUserExists = async function(userId: number){
  const existingUser = await UserModel.findOne({userId})
  return existingUser;
}

export const UserModel = model<User, UserModels>('User', userSchema);
