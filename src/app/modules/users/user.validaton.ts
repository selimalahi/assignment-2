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
export const userOrderItemValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema = z.object({
  userId: z
    .number({
      required_error: 'userId is required',
      invalid_type_error: 'userId must be a number',
    })
    .int(),
  username: z
    .string({
      required_error: 'username is required',
      invalid_type_error: 'username must be a string',
    })
    .min(1),
  password: z.string(),
  fullName: userFullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: userAddressValidationSchema,
  orders: z.array(userOrderItemValidationSchema).optional(),
});


// update user data 

export const updateUserValidationSchema = z.object({
  userId: z
    .number({
      required_error: 'userId is required',
      invalid_type_error: 'userId must be a number',
    })
    .int().optional(),
  username: z
    .string({
      required_error: 'username is required',
      invalid_type_error: 'username must be a string',
    })
    .min(1).optional(),
  password: z.string().optional(),
  fullName: userFullNameValidationSchema.optional(),
  age: z.number().optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: userAddressValidationSchema.optional(),
  // orders: z.array(userOrderItemValidationSchema).optional(),
});


export default userValidationSchema;
