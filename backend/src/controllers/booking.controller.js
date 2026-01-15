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