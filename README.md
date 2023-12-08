## Table of Contents

--- Project Overview]
--- Getting Started]
  -- Prerequisites]
   -- Installation
   
--- Usage
  -- User Management
  -- Order Management
--- API Endpoints
--- Validation
--- Built With
--- Envirment Variable
--- Run the Application


## Project Overview

This project is a Node.js Express API with TypeScript , utilizing MongoDB with Mongoose for user data and order management. It includes features such as user creation, retrieval, updating, and deletion, as well as order creation and management.

## Getting Started
### Prerequisites
-- Node.js
-- MongoDB
-- npm 
-- types/bcrypt
-- @types/cors
-- @types/express
-- @typescript-eslint/eslint-plugin
-- @typescript-eslint/parser
-- @eslint
-- eslint-config-prettier
-- prettier
-- ts-node-dev
-- typescript

### Installation

1. Clone the repository:   
   git clone [https://github.com/your-username/your-repo.git](https://github.com/selimalahi/assignment-2.git)https://github.com/selimalahi/assignment-2.git

1.   Install dependencies:
     npm install
     
3.   Set up your MongoDB database and configure the connection in .env or config.ts.


##   Usage
  ### User Management 
		 1. Create a new user
	   2. Retrieve a list of all users
		 3. Retrieve a specific user by ID
     4. Update user information
		 5. Delete a user
	 
  ### Order Management: 
	  1. Add New Product in Order
	  2. Retrieve all orders for a specific user
	  3. Calculate Total Price of Orders for a Specific User


##    API Endpoints
Document all API endpoints and their descriptions.
POST /api/users
GET /api/users
GET /api/users/:userId
PUT /api/users/:userId
DELETE /api/users/:userId
PUT /api/users/:userId/orders
GET /api/users/:userId/orders
GET /api/users/:userId/orders/total-price


## Validation
  Data validation is implemented using Zod. Provide examples of valid and invalid requests and the corresponding error messages.

##  Built With
  -- Node.js
   -- Express
   -- TypeScript
    -- MongoDB (Mongoose)
     -- Zod
## Envirment Variable
PORT=5000
DATABASE_URL=mongodb+srv://admin-pro:ugmRgstdRRj7CMj3@cluster0.ykdu8fg.mongodb.net/assingment-project?retryWrites=true&w=majority
BCRYPT_SALT_ROUNDS=12

## Run the Application
  npm run start:dev

