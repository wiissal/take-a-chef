const User = require('./User');
const Chef = require('./Chef');
const Customer = require('./Customer');
const Dish = require('./Dish');
const Booking = require('./Booking');
const Review = require('./Review');

// Define relationships
User.hasOne(Chef, { foreignKey: 'user_id' });
Chef.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Customer, { foreignKey: 'user_id' });
Customer.belongsTo(User, { foreignKey: 'user_id' });

Chef.hasMany(Dish, { foreignKey: 'chef_id' });
Dish.belongsTo(Chef, { foreignKey: 'chef_id' });

Customer.hasMany(Booking, { foreignKey: 'customer_id' });
Booking.belongsTo(Customer, { foreignKey: 'customer_id' });

Chef.hasMany(Booking, { foreignKey: 'chef_id' });
Booking.belongsTo(Chef, { foreignKey: 'chef_id' });

Booking.hasOne(Review, { foreignKey: 'booking_id' });
Review.belongsTo(Booking, { foreignKey: 'booking_id' });

Chef.hasMany(Review, { foreignKey: 'chef_id' });
Review.belongsTo(Chef, { foreignKey: 'chef_id' });

module.exports = {
  User,
  Chef,
  Customer,
  Dish,
  Booking,
  Review
};