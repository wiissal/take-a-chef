// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");
const { sequelize, testConnection } = require("./src/config/database");
const { User, Chef, Customer, Dish, Booking, Review } = require("./src/models");
const {
  notFound,
  errorHandler,
} = require("./src/middlewares/error.middleware");
const logger = require("./src/config/logger");
const morganMiddleware = require("./src/middlewares/morgan.middleware");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Take A Chef API Docs",
  }),
);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome endpoint
 *     tags: [General]
 *     description: Returns a welcome message with API status
 *     responses:
 *       200:
 *         description: API is running successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Take A Chef API is running!
 *                 status:
 *                   type: string
 *                   example: success
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
app.get("/", (req, res) => {
  res.json({
    message: " Take A Chef API is running!",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [General]
 *     description: Returns server health status
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: healthy
 *                 uptime:
 *                   type: number
 *                   example: 123.456
 *                 environment:
 *                   type: string
 *                   example: development
 */
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// API Routes
const authRoutes = require("./src/routes/auth.routes");
const chefRoutes = require("./src/routes/chef.routes");
const bookingRoutes = require("./src/routes/booking.routes");
const reviewRoutes = require("./src/routes/review.routes");
const userRoutes = require("./src/routes/user.routes");

app.use("/api/auth", authRoutes);
app.use("/api/chefs", chefRoutes);
app.use("/api/bookings", bookingRoutes);
console.log(" Bookings routes registered at /api/bookings");

app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);

// Test error route
app.get("/test-error", (req, res, next) => {
  const ApiError = require("./src/utils/ApiError");
  next(new ApiError(400, "This is a test error!"));
});

// 404 Error Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", async () => {
  logger.info(` Server is running on http://localhost:${PORT}`);
  logger.info(
    ` API Documentation available at http://localhost:${PORT}/api-docs`,
  );
  logger.info(` Environment: ${process.env.NODE_ENV}`);

  // Test database connection
  await testConnection();

  // Sync models with database
  await sequelize.sync({ alter: true });
  logger.info(" Database models synchronized!");
});

module.exports = app;
