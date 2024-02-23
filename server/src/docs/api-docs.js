/**
 * @swagger
 * /api/v1/health:
 *   get:
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
 *
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Returns all users
 *     responses:
 *       200:
 *         description: Successful return
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   example: OK
 *
 * @swagger
 * /users/search:
 *   get:
 *     summary: Search for users
 *     description: Returns all users that match a query string
 *     responses:
 *       200:
 *         description: Successful return
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   example: OK
 */
