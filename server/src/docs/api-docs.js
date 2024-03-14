/**
 * @swagger
 * tags:
 *   - name: Health
 *     description: API Health Check
 *   - name: Users
 *     description: User Management
 *   - name: Auth
 *     description: Authentication
 */

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     tags: [Health]
 *     summary: Check API health
 *     description: Returns the health status of the API
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags: [Users]
 *     summary: Get users with optional search, pagination, and limits
 *     description: Returns users with support for optional search by full name, service name, and email, as well as pagination and limit parameters.
 *     parameters:
 *       - in: query
 *         name: search
 *         required: false
 *         description: Search term for full name, service name, or email
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination (default is 1)
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of users per page (default is 10)
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Successful return of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 100
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                     hasNextPage:
 *                       type: boolean
 *                       example: true
 *                     hasPrevPage:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *         phone:
 *           type: string
 *           example: '+61423123123'
 *         suburb:
 *           type: string
 *           example: 'Springfield'
 *         postcode:
 *           type: string
 *           example: '1234'
 *         facebookName:
 *           type: string
 *           example: 'JohnDoe'
 *         story:
 *           type: string
 *           example: 'Once upon a time...'
 *         education:
 *           type: object
 *           properties:
 *             course:
 *               type: string
 *               example: 'Computer Science'
 *             college:
 *               type: string
 *               example: 'Springfield University'
 *             yearGraduated:
 *               type: integer
 *               example: 2022
 *         service:
 *           type: object
 *           properties:
 *             serviceName:
 *               type: string
 *               example: 'Web Development'
 *             serviceLogo:
 *               type: string
 *               example: 'logo.png'
 *             serviceUrl:
 *               type: string
 *               example: 'https://example.com'
 *         isAutomated:
 *           type: boolean
 *           example: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 */

/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     tags: [Auth]
 *     summary: User signup
 *     description: Allows a new user to create an account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - passwordConfirm
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               passwordConfirm:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created
 *                 token:
 *                   type: string
 *                 status:
 *                   type: string
 *                   example: OK
 *       409:
 *         description: Email already in use
 */
/**
 * @swagger
 * /api/v1/users/signin:
 *   post:
 *     tags: [Auth]
 *     summary: User signin
 *     description: Allows user to sign in with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User signed in
 *                 token:
 *                   type: string
 *                 status:
 *                   type: string
 *                   example: OK
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/v1/users/request-reset-password:
 *   post:
 *     tags: [Auth]
 *     summary: Request password reset
 *     description: Sends an email to the user with password reset instructions.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Reset email sent (status code always 200 for security reasons)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reset email sent
 *                 status:
 *
 */

/**
 * @swagger
 * /api/v1/users/reset-password:
 *   post:
 *     tags: [Auth]
 *     summary: Reset password
 *     description: Allows user to reset their password using a token received by email.
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Password successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password successfully changed
 *                 status:
 *                   type: string
 *                   example: OK
 *       400:
 *         description: Invalid Token
 *       404:
 *         description: Not found
 */
