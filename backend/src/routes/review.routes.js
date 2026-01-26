const express = require ('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');  

const {createReview} = require ('../controllers/review.controller');
const { protect, restrictTo} = require ('../middlewares/auth.middleware');
const { createReviewValidator } = require('../validators/review.validator');
const validate = require('../middlewares/validation.middleware');

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         booking_id:
 *           type: integer
 *         chef_id:
 *           type: integer
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         comment:
 *           type: string
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a review (Customer only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - booking_id
 *               - rating
 *             properties:
 *               booking_id:
 *                 type: integer
 *                 example: 1
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Amazing chef! The food was delicious and the service was excellent.
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Invalid input or booking not completed
 *       403:
 *         description: Only customers can leave reviews
 *       404:
 *         description: Booking not found
 */
router.post('/', protect, createReviewValidator, validate, reviewController.createReview);

module.exports = router;
 