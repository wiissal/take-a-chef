const express = require('express');
const router = express.Router();
const {
  getAllChefs,
  getChefById,
  getChefDishes,
  getChefReviews
} = require('../controllers/chef.controller');

/**
 * @swagger
 * tags:
 *   name: Chefs
 *   description: Chef discovery and search
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Chef:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         bio:
 *           type: string
 *         specialty:
 *           type: string
 *         rating:
 *           type: number
 *           format: float
 *         total_reviews:
 *           type: integer
 *         User:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *             email:
 *               type: string
 */

/**
 * @swagger
 * /api/chefs:
 *   get:
 *     summary: Get all chefs with search and filters
 *     tags: [Chefs]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by chef name
 *       - in: query
 *         name: specialty
 *         schema:
 *           type: string
 *         description: Filter by specialty
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: number
 *         description: Minimum rating filter
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [rating, created_at, total_reviews]
 *           default: rating
 *         description: Sort field
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of chefs with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     chefs:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Chef'
 *                     pagination:
 *                       type: object
 */
router.get('/', getAllChefs);

/**
 * @swagger
 * /api/chefs/{id}:
 *   get:
 *     summary: Get chef details by ID
 *     tags: [Chefs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Chef ID
 *     responses:
 *       200:
 *         description: Chef details with dishes and reviews
 *       404:
 *         description: Chef not found
 */
router.get('/:id', getChefById);

/**
 * @swagger
 * /api/chefs/{id}/dishes:
 *   get:
 *     summary: Get chef's dishes
 *     tags: [Chefs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of chef's dishes
 *       404:
 *         description: Chef not found
 */
router.get('/:id/dishes', getChefDishes);

/**
 * @swagger
 * /api/chefs/{id}/reviews:
 *   get:
 *     summary: Get chef's reviews
 *     tags: [Chefs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of chef's reviews with stats
 *       404:
 *         description: Chef not found
 */
router.get('/:id/reviews', getChefReviews);

module.exports = router;