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
// const userOrderValidationSchema = z.object({
//   productName: z.string(),
//   price: z.number(),
//   quantity: z.number(),
// });

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
  // orders: z.array(userOrderValidationSchema),
});

export default userValidationSchema;






















// import Joi from 'joi';

// const userFullNameSchema = Joi.object({
//   firstName: Joi.string().required(),
//   lastName: Joi.string().required(),
// });

// const userAddressSchema = Joi.object({
//   street: Joi.string(),
//   city: Joi.string(),
//   country: Joi.string(),
// });

// const userOrderSchema = Joi.object({
//   productName: Joi.string().required(),
//   price: Joi.number().required(),
//   quantity: Joi.number().required(),
// });

// const userValidetionSchema = Joi.object({
//   userId: Joi.number().required(),
//   username: Joi.string().required(),
//   password: Joi.string().required(),
//   fullName: userFullNameSchema,
//   age: Joi.number(),
//   email: Joi.string().required(),
//   isActive: Joi.boolean(),
//   hobbies: Joi.array().items(Joi.string()),
//   address: userAddressSchema.required(),
//   orders: Joi.array().items(userOrderSchema),
// });

// export default userValidetionSchema;