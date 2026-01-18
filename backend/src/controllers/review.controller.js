const { Review, Booking, Chef, Customer, User} = require('../models');
const ApiError = require('../utils/ApiError');
const { sequelize } = require ('../config/database');

//Create a review (Customer only)
const createReview = async (req, res, next) =>{
  try{
    const {booking_id, rating, comment} = req.body;
    //verify user is a customer
    if(req.user.role !== 'customer') {
      return next (new ApiError(403, 'Only customers can leave reviews'));
    }

    //Get customer profile 
    const customer = await Customer.findOne({where: {user_id: req.user.id} });
    if(!customer){
      return next (new ApiError(404, 'Customer profile not found'));
    }

    //verify booking exists
    const booking = await Booking.findByPk(booking_id, {
      include: [
        {model: Chef},
        { model: Customer}
      ] 
    });
    if (!booking) {
      return next (new ApiError( 404, 'Booking not found'));
    }
    //verify this booking belongs to the customer
    if(booking.customer_id !== customer.id) {
      return next (new ApiError(403, ' You can only review your own bookings'));
    }

    //verify booking is completed 
    if(booking.status !== 'completed') {
      return next (new ApiError (400, 'You can only review completed bookings'));
    }

    //check if review already exists for this booking
    const existingReview = await Review.findOne({where: {booking_id} });
    if(existingReview){
      return next (new ApiError(400, 'You have already reviewed this booking'));
    }

    //validate rating 
    if (rating < 1 || rating > 5) {
      return next (new ApiError(400, 'Rating must be between 1 and 5'));
    }

    //create review 
    const review = await Review.create ({
      booking_id,
      chef_id: booking.chef_id,
      rating,
      comment : comment || ''
    });
    //update chefs rating and total reviews
    await updateChefRtaing (booking.chef_id);
    //fetch  created review with relations
    const createdReview = await Review.findByPk(review.id, {
      include :[
        {
          model: Booking,
          attributes: ['id', 'booking_date', 'booking_time'],
          include: [
            {
              model: Customer,
              include :[{model: User , attributes: ['name']}]
            }
          ]
        },
        {
          model: Chef,
          include: [{model: User, attributes: ['name']}]
        }
      ]
    });
    res.status(201).json({
      success: true,
      message: 'Reviews created successfully',
      data: {
        review: createReview
      }
    });
  } catch (error){
    next(error);
  }
};