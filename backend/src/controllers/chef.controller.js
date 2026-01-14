const {Chef, User,Customer, Dish, Review, Booking} = require ('../models');
const ApiError = require ('../utils/ApiError');
const {Op} = require ('sequelize');

//get all chefs with search and filters 

const getAllChefs = async (req, res, next) => {
  try {
    const { 
      search, 
      specialty, 
      minRating, 
      page = 1, 
      limit = 10,
      sortBy = 'rating',
      order = 'DESC'
    } = req.query;

    // Build filter conditions
    const whereConditions = {};
    
    // Search by specialty
    if (specialty) {
      whereConditions.specialty = {
        [Op.iLike]: `%${specialty}%`
      };
    }

    // Filter by minimum rating
    if (minRating) {
      whereConditions.rating = {
        [Op.gte]: parseFloat(minRating)
      };
    }

    // User search conditions (name)
    const userWhereConditions = {};
    if (search) {
      userWhereConditions.name = {
        [Op.iLike]: `%${search}%`
      };
    }

    // Pagination
    const pageNumber = parseInt(page);
    const pageLimit = parseInt(limit);
    const offset = (pageNumber - 1) * pageLimit;

    // Query chefs with filters
    const { count, rows: chefs } = await Chef.findAndCountAll({
      where: whereConditions,
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'created_at'],
          where: Object.keys(userWhereConditions).length > 0 ? userWhereConditions : undefined
        }
      ],
      limit: pageLimit,
      offset: offset,
      order: [[sortBy, order]],
      distinct: true
    });

    // Calculate pagination info
    const totalPages = Math.ceil(count / pageLimit);

    res.status(200).json({
      success: true,
      data: {
        chefs,
        pagination: {
          currentPage: pageNumber,
          totalPages: totalPages,
          totalChefs: count,
          chefsPerPage: pageLimit,
          hasNextPage: pageNumber < totalPages,
          hasPrevPage: pageNumber > 1
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
//get chef by ID with full details 
 
const getChefById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const chef = await Chef.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'created_at']
        },
        {
          model: Dish,
          attributes: ['id', 'name', 'description', 'price', 'image']
        },
        {
          model: Review,
          include: [
            {
              model: Booking,
              attributes: ['id', 'booking_date'],
              include: [
                {
                  model: Customer,
                  include: [
                    {
                      model: User,
                      attributes: ['name']
                    }
                  ]
                }
              ]
            }
          ],
          limit: 5,
          order: [['created_at', 'DESC']]
        }
      ]
    });

    if (!chef) {
      return next(new ApiError(404, 'Chef not found'));
    }

    res.status(200).json({
      success: true,
      data: {
        chef
      }
    });
  } catch (error) {
    next(error);
  }
};

 //get chef's dishes
 const getChefDishes = async (req, res, next)=>{
  try{
    const { id } = req.params;
    const{ category, minPrice, maxPrice, page =1, limit=10} = req.query;

    //check if chef exists
    const chef = await chef.findByPk(id);
    if(!chef) {
      return next(new ApiError(404 , 'Chef not found'))
    }
    //build after conditions
    const whereConditions = {chef_id: id};
    if(category){
      whereConditions.category= {
        [Op.ilike]: `%${category}%`
      };
    }
    if(minPrice || maxPrice){
      whereConditions.price ={};
      if(minPrice) whereConditions.price[Op.gte] = parseFloat(minPrice);
      if(maxPrice) whereConditions.price[Op.lte] = parseFloat(maxPrice);
    }
    //pagination
    const offset = (page -1) * limit;
    const {count, rows: dishes} = await Dish.findAndCountAll({
      where: whereConditions,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order:[['created_at', 'DESC']]
    });
    const totalPages = Math.ceil(count / limit);
    res. status(200).json({
      success: true,
      data:{
        dishes,
        pagination:{
          currentPage: parseInt(page),
          totalPages,
          totalDishes: count,
          dishesPerPage: parseInt(limit)
        }
      }
    });
  }catch (error){
    next(error);
  }
};

//Get chef's reviews
const getChefReviews = async (req, res, next) =>{
  try{
    const { id } = req.params;
    const {page =1 , limit = 10} = req.query;

    //check if chef exists
    const chef = await Chef.findByPk(id);
    if(!chef){
      return next(new ApiError(404, 'Chef not found'));
    }
    //pagination
    const offset = (page - 1) * limit;
    const{count, rows: reviews } = await Review. findAndCountAll({
      where: {chef_id: id },
      include:[
        {
          model: User,
          attributes: ['id', 'name']
        },
        {
          model: Booking,
          attributes: ['id', 'booking_date']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order:[['created_at', 'DESC']]
    });

    const totalPages = Math.ceil(count / limit);
    
    //calculate average rating
    const avgRating = reviews.length > 0
    ? reviews.reduce((sum, reviews) => sum + reviews.rating, 0) / reviews.length
    : 0;
    res.status(200).json({
      success: true,
      data:{
        reviews,
        stats:{
          totalReviews: count,
          averageRating: avgRating.toFixed(2)
        },
        pagination:{
          currentPage: parseInt(page),
          totalPages,
          reviewsPerPages: parseInt(limit)
        }
      }
    });
  } catch (error){
    next(error);
  }
};
module.exports = {
  getAllChefs,
  getChefById,
  getChefDishes,
  getChefReviews
};