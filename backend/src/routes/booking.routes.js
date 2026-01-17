const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking
} = require('../controllers/booking.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         customer_id:
 *           type: integer
 *         chef_id:
 *           type: integer
 *         booking_date:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled, completed]
 *         event_type:
 *           type: string
 *         guest_count:
 *           type: integer
 *         special_requests:
 *           type: string
 *         total_price:
 *           type: number
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking (Customer only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - chef_id
 *               - booking_date
 *             properties:
 *               chef_id:
 *                 type: integer
 *                 example: 2
 *               booking_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-02-15T19:00:00Z
 *               event_type:
 *                 type: string
 *                 example: private_dining
 *               guest_count:
 *                 type: integer
 *                 example: 4
 *               special_requests:
 *                 type: string
 *                 example: No nuts please, vegetarian option needed
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Invalid input or booking date in past
 *       403:
 *         description: Only customers can create bookings
 *       404:
 *         description: Chef not found
 *   get:
 *     summary: Get all bookings for current user
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, cancelled, completed]
 *         description: Filter by booking status
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
 *         description: List of user bookings
 */
router.post('/', protect, createBooking);
router.get('/', protect, getUserBookings);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Booking details
 *       403:
 *         description: Not authorized to view this booking
 *       404:
 *         description: Booking not found
 */
router.get('/:id', protect, getBookingById);

/**
 * @swagger
 * /api/bookings/{id}/status:
 *   put:
 *     summary: Update booking status (Chef only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, cancelled, completed]
 *                 example: confirmed
 *     responses:
 *       200:
 *         description: Booking status updated successfully
 *       400:
 *         description: Invalid status
 *       403:
 *         description: Only chefs can update booking status
 *       404:
 *         description: Booking not found
 */
router.put('/:id/status', protect, restrictTo('chef'), updateBookingStatus);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Cancel booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       400:
 *         description: Cannot cancel completed or already cancelled booking
 *       403:
 *         description: Not authorized to cancel this booking
 *       404:
 *         description: Booking not found
 */
router.delete('/:id', protect, cancelBooking);

module.exports = router;