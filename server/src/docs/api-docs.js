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
 *     summary: Get all users
 *     description: Returns all users
 *     responses:
 *       200:
 *         description: Successful return of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
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
