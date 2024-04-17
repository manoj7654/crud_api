const express=require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRoutes");
const cacheMiddleware = require("./cach");
const rateLimit = require("express-rate-limit");
const swaggerJsDoc=require("swagger-jsdoc");
const swaggerUi=require("swagger-ui-express");
const app=express();


require("dotenv").config();

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: "Too many requests  please try again later"
  });

  const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "User Api",
            version: "1.0.0",
            description: "API documentation for User API",
        },
        servers: [
            {
                url: "http://localhost:4500/"
            }
        ],
        components: {
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        },
                        email: {
                            type: "string",
                            format: "email"
                        },
                        phone: {
                            type: "number"
                        },
                        password: {
                            type: "string"
                        },
                        createdAt: {
                            type: "string",
                            format: "date"
                        }
                    },
                    required: ["name", "email", "phone", "password"]
                }
            }
        }
    },
    apis: ['./index.js'] // Path to your API endpoints
};


  const swaggerSpec=swaggerJsDoc(options);
  app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))





/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: Add a new user
 *     description: This endpoint inserts a new user into the database.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request - Invalid input data
 *       '401':
 *         description: Unauthorized - Authentication required
 *       '500':
 *         description: Internal server error - Failed to create user
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and generate a JWT token.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password of the user.
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication.
 *       '401':
 *         description: Unauthorized - Invalid credentials
 *       '500':
 *         description: Internal server error - Failed to authenticate user
 * /users/allData:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users with pagination support.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of items to return per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *     responses:
 *       '200':
 *         description: A JSON array of user objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 * /users/edit/{id}:
 *   patch:
 *     summary: Update a user
 *     description: Update an existing user's information.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '400':
 *         description: Bad request - Invalid input data
 *       '401':
 *         description: Unauthorized - Authentication required
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error - Failed to update user
 * /users/remove/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete an existing user from the database.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '400':
 *         description: Bad request - Invalid input data
 *       '401':
 *         description: Unauthorized - Authentication required
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error - Failed to delete user
 */





app.use(express.json())
app.use(limiter);

app.use("/users",userRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running on port no ${process.env.port}`)
})
