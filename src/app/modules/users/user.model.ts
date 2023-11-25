import { Schema, model } from 'mongoose';
import { User, UserAddress, UserFullName, UserOrders } from './user.interface';

const userFullnameSchema = new Schema<UserFullName>({
    
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      
});

const userAddressSchema = new Schema<UserAddress>(
    {
        street: { type: String },
        city: { type: String },
        country: { type: String },
      });

 const userOrderSchems =  new Schema<UserOrders>( [
    {
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ]);     

  const userSchema = new Schema<User>({
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
  fullName:userFullnameSchema,
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String }],
  address: userAddressSchema,
  orders:userOrderSchems,
});


export const UserModel = model<User>('User', userSchema);