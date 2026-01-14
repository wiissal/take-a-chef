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
 *   description: Chef discovery and search endpoints
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
 *         description: Minimum rating
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
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: rating
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           default: DESC
 *     responses:
 *       200:
 *         description: List of chefs retrieved successfully
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
 *         description: Chef details retrieved successfully
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
 *         description: Chef dishes retrieved successfully
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
 *         description: Chef reviews retrieved successfully
 *       404:
 *         description: Chef not found
 */
router.get('/:id/reviews', getChefReviews);

module.exports = router;