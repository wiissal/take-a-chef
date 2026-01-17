const { Booking, Chef, Customer, User } = require("../models");
const ApiError = require("../utils/ApiError");
const { Op } = require("sequelize");

//create a new booking for customer only
const createBooking = async (req, res, next) => {
  try {
    const { chef_id, booking_date, event_type, guest_count, special_requests } =
      req.body;
    console.log("🔍 req.user:", req.user); // ADD THIS
    console.log("🔍 req.user.id:", req.user.id); // ADD THIS
    console.log("🔍 req.user.role:", req.user.role); // ADD THIS

    //verify the user is a customer
    if (req.user.role !== "customer") {
      return next(new ApiError(403, "Only customers can create bookings"));
    }
    console.log("✅ About to find customer with user_id:", req.user.id); // ADD THIS

    //get customer profile
    const customer = await Customer.findOne({
      where: { user_id: req.user.id },
    });
    console.log("🔍 Customer found:", customer); // ADD THIS

    if (!customer) {
      return next(new ApiError(404, "Customer profile not found"));
    }
    //verify chef exists
    const chef = await Chef.findByPk(chef_id);
    if (!chef) {
      return next(new ApiError(404, "Chef not found"));
    }
    //check if booking date is in the future
    const bookingDateTime = new Date(booking_date);
    if (bookingDateTime < new Date()) {
      return next(new ApiError(400, "Booking date must be in the future"));
    }
    // Extract date and time separately
    const bookingDateOnly = bookingDateTime.toISOString().split('T')[0];
    const bookingTimeOnly = bookingDateTime.toISOString().split('T')[1].substring(0, 8);


    //create booking
    const booking = await Booking.create({
      customer_id: customer.id,
      chef_id,
      booking_date: bookingDateOnly,
      booking_time: bookingTimeOnly,
      guests: guest_count || 2,
      status: 'pending',
      total_price: 0.00  
    });
    //fetch booking with related data
    const createdBooking = await Booking.findByPk(booking.id, {
      include: [
        {
          model: Chef,
          include: [{ model: User, attributes: ["name", "email"] }],
        },
        {
          model: Customer,
          include: [{ model: User, attributes: ["name", "email"] }],
        },
      ],
    });
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: {
        booking: createdBooking,
      },
    });
  } catch (error) {
    next(error);
  }
};
//get all bookings for current user (customer or chef)
const getUserBookings = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let whereConditions = {};
    let include = [];

    //build query bqsed on user role
    if (req.user.role === "customer") {
      const customer = await Customer.findOne({
        where: { user_id: req.user.id },
      });
      if (!customer) {
        return next(new ApiError(404, "Customer profile not found"));
      }
      whereConditions.customer_id = customer.id;
      include = [
        {
          model: Chef,
          include: [{ model: User, attributes: ["name", "email"] }],
        },
      ];
    } else if (req.user.role === "chef") {
      const chef = await Chef.findOne({ where: { user_id: req.user.id } });
      if (!chef) {
        return next(new ApiError(404, "Chef profile not found"));
      }
      whereConditions.chef_id = chef.id;
      include = [
        {
          model: Customer,
          include: [{ model: User, attributes: ["name", "email"] }],
        },
      ];
    }

    //filter by status if provided
    if (status) {
      whereConditions.status = status;
    }

    //pagination
    const pageNumber = parseInt(page);
    const pageLimit = parseInt(limit);
    const offset = (pageNumber - 1) * pageLimit;
    const { count, rows: bookings } = await Booking.findAndCountAll({
      where: whereConditions,
      include,
      limit: pageLimit,
      offset: offset,
      order: [["booking_date", "DESC"]],
    });
    const totalPages = Math.ceil(count / pageLimit);
    res.status(200).json({
      success: true,
      data: {
        bookings,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          totalBookings: count,
          bookingsPerPage: pageLimit,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

//get booking by id
const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id, {
      include: [
        {
          model: Chef,
          include: [{ model: User, attributes: ["name", "email"] }],
        },
        {
          model: Customer,
          include: [{ model: User, attributes: ["name", "email"] }],
        },
      ],
    });
    if (!booking) {
      return next(new ApiError(400, "Booking not found"));
    }

    //verify user had access to booking
    const customer = await Customer.findOne({
      where: { user_id: req.user.id },
    });
    const chef = await Chef.findOne({ where: { user_id: req.user.id } });

    const isCustomer = await Customer.findOne({
      where: { user_id: req.user.id },
    });
    const isChef = chef && booking.chef_id === chef.id;
    if (!isCustomer && !isChef) {
      return next(new ApiError(403, " Not authorized to view this booking"));
    }
    res.status(200).json({
      sucess: true,
      data: {
        booking,
      },
    });
  } catch (error) {
    next(error);
  }
};

//update booking status for chef only " might implement it later"
const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    //verify the role of user is a chef to validate and update booking
    if (req.user.role !== "chef") {
      return next(new ApiError(403, " Only chefs can update booking status"));
    }
    //validate status
    const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
    if (!validStatuses.includes(status)) {
      return next(
        new ApiError(
          400,
          `status must be one of : ${validStatuses.join(", ")} `
        )
      );
    }

    //get chef profile
    const chef = await Chef.findOne({ where: { user_id: req.user.id } });
    if (!chef) {
      return next(new ApiError(404, " Chef profile not found"));
    }

    //find booking
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return next(new ApiError(404, "Booking not found"));
    }
    //verify this booking belongs to a chef
    if (booking.chef_id !== chef.id) {
      return next(new ApiError(403, "Not authorized to update this booking"));
    }
    //update status
    booking.status = status;
    await booking.save();

    //fetch updated booking with relations
    const updatedBooking = await Booking.findByPk(id, {
      include: [
        {
          model: Customer,
          include: [{ model: User, attributes: ["name", "email"] }],
        },
      ],
    });
    res.status(200).json({
      sucess: true,
      message: `Booking ${status} successfully`,
      data: {
        booking: updatedBooking,
      },
    });
  } catch (error) {
    next(error);
  }
};
//Cancel booking by customer / chef
const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return next(new ApiError(404, "Booking not found"));
    }
    //verify user has access to cancek this booking
    const customer = await Customer.findOne({
      where: { user_id: req.user.id },
    });
    const chef = await Chef.findOne({ where: { user_id: req.user.id } });

    const isCustomer = customer && booking.customer_id === customer.id;
    const isChef = chef && booking.chef_id === chef.id;

    if (!isCustomer && !isChef) {
      return next(new ApiError(403, "Not authorized to cancel this booking"));
    }
    //check if booking can be cancelled
    if (booking.status === "completed") {
      return next(new ApiError(400, "Can not cancel a completed  booking"));
    }
    if (booking.status === "cancelled") {
      return next(new ApiError(400, " Booking is already cancelled"));
    }

    //update status to cancelled
    booking.status = " cancelled";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: {
        booking,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
};
