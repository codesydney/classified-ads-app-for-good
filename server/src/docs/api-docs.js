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
