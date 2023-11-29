import { z } from 'zod';

// Define Zod schema for UserFullName
const userFullNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

// Define Zod schema for UserAddress
const userAddressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

// Define Zod schema for UserOrder
// const userOrderValidationSchema = z.object([{
//   productName: z.string(),
//   price: z.number(),
//   quantity: z.number(),
// }]);
const userOrderItemValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

// Define Zod schema for User
const userValidationSchema = z.object({
  userId: z.number().int(),
  username: z.string().min(1),
  password: z.string(),
  fullName: userFullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: userAddressValidationSchema,
  orders: z.array(userOrderItemValidationSchema).optional(),
});

export default userValidationSchema;





















