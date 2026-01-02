const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Booking = require("./Booking");
const Chef = require("./Chef");

const Review = sequelize.define("Review", {
  id: {
    types: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  booking_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: "bookings",
      key: "id",
    },
  },
  chef_id:{
    type: DataTypes.INTEGER,
    allowNull:false,
    references: {
      model: 'chefs',
      key: 'id'
    }
  },
  rating:{
    type: DataTypes.INTEGER,
    allowNull: false,
    validate:{
      min: 1,
      max: 5
    }
  },
  comment:{
    type: DataTypes.TEXT,
    allowNull: true
  }
},{
 tableName: 'reviews',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

//define relationships
Review.belongsTo(Booking, {foreignKey: 'booking_id', as: 'booking'});
Booking.hasOne(Review, {foreignKey: 'chef_id', as: 'reviews'});

Review.belongsTo(Chef, {foreignKey: 'chef_id', as: 'chef'});
Chef.hasMany(Review, {foreignKey: ' chef_id', as: 'reviews'});

module.exports= Review;
