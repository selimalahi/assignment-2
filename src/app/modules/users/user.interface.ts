/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type UserFullName = {
  firstName: string;
  lastName: string;
};

export type UserAddress = {
  street: string;
  city: string;
  country: string;
};

// export type UserOrders = [
//   {
//     productName: string;
//     price: number;
//     quantity: number;
//   },
// ];
export type UserOrders = {
  productName: string;
  price: number;
  quantity: number;
}[];

export type User = {
  userId: number;
  username: string;
  password: string;
  fullName: UserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: UserAddress;
  // orders?: UserOrders;
  orders: UserOrders;
};

export type UserMethods = {
  isUserExists(userId: number): Promise<User | null>;
};

export type UserModels = Model<User, Record<string, never>, UserMethods>;