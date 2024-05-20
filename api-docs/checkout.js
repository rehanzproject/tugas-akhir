/**
 * @swagger
 * tags:
 *   name: Checkout
 *   description: The Checkout managing API
 */

/**
 * @swagger
 * /user/checkout/verify:
 *   post:
 *     summary: Verify Checkout
 *     tags: [Checkout]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       201:
 *         description: Verify Checkout successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Checkout'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 * /user/checkout:
 *   post:
 *     summary: Add Checkout
 *     tags: [Checkout]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *       - in: query
 *         name: course_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course
 *     responses:
 *       201:
 *         description: Checkout registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Checkout'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */