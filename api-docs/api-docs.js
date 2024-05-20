/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  // Optional, just to specify the format
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *       properties:
 *         fullName:
 *           type: string
 *           description: The user's full name
 *         email:
 *           type: string
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         fullName: John Doe
 *         email: johndoe@example.com
 *         password: securePassword123
 *     Course:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: The course's name
 *         price:
 *           type: number
 *           description: The course's price
 *         description:
 *           type: string
 *           description: The course's description
 *       example:
 *         name: UI UX Design
 *         price: 100000
 *         description: lorem
 *     Checkout:
 *       type: object
 *       required:
 *         - user_id
 *         - course_id
 *         - description
 *       properties:
 *         user_id:
 *           type: string
 *           description: The checkout's user_id
 *         course_id:
 *           type: number
 *           description: The checkout's course_id
 *       example:
 *         user_id: 244c1ead-4507-45ee-a306-f3e2c600be68
 *         course_id: 4a68d933-093d-4020-bb69-59bc030de0ea
 *     LogoutResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message indicating the result of the logout
 *       example:
 *         message: "User logged out successfully"
 */
