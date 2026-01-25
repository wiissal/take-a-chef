const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Chef, Customer } = require("../models");
const ApiError = require("../utils/ApiError");

//generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};
//register new user
const register = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;

    // Validate required fields
    if (!email || !password || !name || !role) {
      return next(new ApiError(400, 'Please provide email, password, name, and role'));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(new ApiError(400, 'User already exists with this email'));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password_hash: hashedPassword,
      name,
      role
    });

    // ✅ AUTO-CREATE CUSTOMER PROFILE IF ROLE IS CUSTOMER
    if (role === 'customer') {
      await Customer.create({
        user_id: user.id
      });
    }

    // ✅ AUTO-CREATE CHEF PROFILE IF ROLE IS CHEF (optional)
    if (role === 'chef') {
      await Chef.create({
        user_id: user.id,
        bio: '',
        specialty: '',
        rating: 0,
        total_reviews: 0
      });
    }

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};
    //login user 
    const login = async (req, res, next) => {
      try{
        const{email, password} = req.body;
        //validate input
        if(!email || !password){
          return next(new ApiError(400, 'Please provide email and password'));
        }
        //check if user exists 
        const user = await User.findOne({ where: {email}});
        if (!user){
          return next (new ApiError (401, 'Invalide email or password'));
        }
        
        //check password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if(!isPasswordValid){
          return next (new ApiError(401, 'invalid email or password'));
        }
        //generate token 
        const token = generateToken(user.id);
        res.status(200).json({
          success: true,
          message: 'Login successful',
          data:{
            user:{
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            },
            token
          }
        });
      }catch (error){
        next(error);
      }
     };
     //get current user profile  "access: private"
     const getMe = async (req, res, next )=> {
      try{
        const user = await User.findByPk(req.user.id,{
          attributes:{exclude: ['password_hash']}
        });
        if (!user){
          return next(new ApiError(404, 'User not found'));
        }
        //get role-specific data
        let profileData = null;
        if(user.role === 'chef'){
          profileData = await Chef.findOne({ where: {user_id: user.id} });
        }else if(user.role === 'customer'){
          profileData= await Customer.findOne({where: {user_id: user.id} });
        }
        res.status(200).json({
          success: true,
          data:{
            user:{
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              created_at: user.created_at
            },
            profile: profileData
          }
        });
        }catch (error){
          next(error);
        }
      };
      module.exports ={
        register,
        login,
        getMe
      }
     

    
  

