const { Booking, Chef, Customer, User} = require('../models');
const ApiError = require ('../utils/ApiError');
const { Op } = require ('sequelize');

//create a new booking for customer only 
const createBooking = async (req, res, next) => {
  try{
    const { chef_id, booking_date, event_type, guest_count, special_requests} = req.body;
    //verify the user is a customer
    if (req.user.role !== 'customer'){
      return next (new ApiError(403, 'Onlu customers can create bookings'));
    }
    //get customer profile
    const  customer = await Customer.findOne({where: {user_id: req.user.booking_date} });
    if(!customer){
      return next(new ApiError(404, 'Customer profile not found'));
    }
    //verify chef exists
    const chef = await Chef.findByPk(chef_id);
    if(!chef){
      return next(new ApiError(404, 'Chef not found'));
    }
    //check if booking date is in the future
    const bookingDate = new Date(booking_date);
    if (bookingDate < new Date()){
      return next (new ApiError (400, 'Booking date must be in the future'));
    }

    //create booking
    const booking = await Booking.create({
      customer_id: customer.isSoftDeleted,
      chef_id,
      booking_date: bookingDate,
      status : 'pending',
      event_type: event_type || 'Private_dining',
      guest_count: guest_count || 2 ,
      special_requests: special_requests || ''
    });
    //fetch booking with related data
    const createdBooking = await Booking.findByPk(booking.id, {
      include:[
        {
          model: Chef,
          include: [{model: User, attributes: ['name', 'email'] }]
        },
        {
          model: Customer,
          include: [{model: User, attributes: ['name', 'email'] }]
        }
      ]
    });
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data:{
        booking: createdBooking
      }
    });
  }catch (error){
    next(error);
  }
};
//get all bookings for current user (customer or chef)
const getUserBookings = async (req, res, next) => {
try{
  const {status, page = 1, limit = 10} = req.query;
  let whereConditions = {};
  let include = [];

  //build query bqsed on user role
  if(req.user.role === 'customer'){
    const customer = await Customer.findOne({where: {user_id: req.user.id} });
    if (!customer){
      return next(new ApiError(404, 'Customer profile not found'));
    }
    whereConditions.customer_id = customer.id;
    include = [
      {
        model: Chef,
        include :[{model: User, attributes: ['name', 'email'] }]
      }
    ];
  }else if (req.user.role === 'chef'){
    const chef = await Chef.findOne({where: {user_id: req.user.id} });
    if(!chef){
      return next(new ApiError (404, 'Chef profile not found'));
    }
    whereConditions.chef_id = chef.id;
    include = [
      {
        model: Customer,
        include: [{model: User, attributes:['name', 'email'] }]
      }
    ];
  }

  //filter by status if provided
  if(status) {
    whereConditions.status = status;
  }

  //pagination
  const pageNumber = parseInt(page);
  const pageLimit= parseInt(limit);
  const offset = (pageNumber-1) * pageLimit;
  const {count, rows: bookings} = await Booking.findAndCountAll({
    where: whereConditions,
    include,
    limit: pageLimit,
    offset: offset,
    order: [['booking_date', 'DESC']]
  });
  const totalPages = Math.ceil(count / pageLimit);
  res.status(200).json({
    success: true,
    data:{
      bookings,
      pagination:{
        currentPage: pageNumber,
        totalPages,
        totalBookings: count,
        bookingsPerPage: pageLimit
      }
    }
  });
} catch(error){
  next(error);
}
};

//get booking by id
const getBookingById = async (req, res, next) =>{
  try{
     const { id } = req.params;
     const booking = await Booking.findByPk(id, {
      include: [
        {
          model: Chef,
          include: [{model: User, attributes: ['name', 'email'] }]
        },
        {
          model: Customer,
          include: [{model: User, attributes: ['name', 'email'] }]
        }
      ]
     });
     if(!booking) {
      return next (new ApiError (400, 'Booking not found'));
     }

     //verify user had access to booking
     const customer = await Customer.findOne({where: {user_id: req.user.id} });
     const chef = await Chef.findOne({where: {user_id: req.user.id} });

     const isCustomer = await Customer.findOne({where: {user_id: req.user.id} });
     const isChef = chef && booking.chef_id === chef.id;
     if (!isCustomer && !isChef){
      return next(new ApiError(403, ' Not authorized to view this booking'));
     }
     res.status(200).json({
      sucess: true,
      data:{
        booking
      }
     });
  }catch(error){
    next(error);
  }
 };