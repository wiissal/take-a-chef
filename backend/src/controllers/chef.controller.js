const {Chef, User, Dish, Review, Booking} = require ('../models');
const ApiError = require ('../utils/ApiError');
const {Op} = require ('sequelize');

//get all chefs with search and filters 
const getAllChefs = async (req, res, next) =>{
  try{
    const{
      search,
      speciality,
      minRating,
      page = 1,
      limit= 10,
      sortBy= 'rating',
      order = 'DESC'
    } = req.query;
    //build filter conditions
    const whereConditions = {};

    //search by speciality
    if(speciality){
      whereConditions.speciality ={
        [Op.ilike]: `%{speciality}%`
      };
    }
    //filter by min rating 
    if(minRating){
      whereConditions.rating = {
        [Op.gte]: parseFloat(minRating)
      };
    }

    //User search conditions (name)
    const userWhereConditions= {};
    if(search){
      userWhereConditions.name ={
        [Op.iLike]: `%${search}%`
      };
    }
    //Pagination
    const offset = (page -1) * limit;

    //Query chefs with filters
    const {count, rows: chefs} = await Chef.findAndCountAll({
      where: whereConditions,
      include :[
        {
          model: User,
          attributes: ['id', 'name', 'email', 'created_at'],
          where: userWhereConditions
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order:[[sortBy, order]],
      distinct: true
    });

    //calculate pagination info
    const totatlPages= Math.ceil(count / limit);
    res.status(200).json({
      success: true,
      data:{
        chefs,
        pagination:{
          currentPage: parseInt(page),
          totalPages,
          totatChefs: count,
          chefsPerPage :parseInt(limit),
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    next (error);
  }
};
//get chef by ID with full details 
 const getChefById = async (req, res, next) =>{
  try{
    const { id } = req.param;
    const chef = await Chef.findByPk(id,{
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'created_at']
        },
        {
          model: Dish,
          attributes : ['id', 'name', 'description', 'price', 'image_url', 'category']
        },
        {
          model: Review,
          include:[
          {
            model: User,
            attributes:['name']
          }
          ],
          limit: 5,
          order: [['created_at', 'DESC']]
        }
      ]
    });
    if(!chef){
      return next(new ApiError(404, 'Chef not found'));
    }
    res.status(200).json({
      success: true,
      data : {
        chef
      }
    });
  }catch (error){
    next(error)
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