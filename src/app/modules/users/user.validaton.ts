import { z } from 'zod';


const userFullNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});


const userAddressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});
const userOrderItemValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

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





















