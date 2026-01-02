const {DataTypes} = require('sequelize');
const {sequelize } = require ('../config/database');
const Customer = require ('./Customer');
const Chef = require('./Chef');

const Booking = sequelize.define('Booking', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: 'customers',
      key: 'id'
    }
  },
  chef_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: 'chefs',
      key: 'id'
    }
  },
  booking_date:{
    type: DataTypes.DATEONLY,
    allowNull: false 
  },
  booking_time:{
    type: DataTypes.TIME,
    allowNull: false
  },
  guests:{
    type:DataTypes.INTEGER,
    allowNull: false,
    validate:{
      min: 1
    }
  },
  status :{
   type: DataTypes.ENUM('pending', 'confirmed', 'completed' , 'concelled'),
   defaultValue: 'pending' 
  },
  total_price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    validate:{
      min: 0
    }
  }
},{
  tableName: 'bookings',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

//define relationships
Booking.belongsTo(Customer, {foreignKey: 'customer_id', as : 'customer'});
Customer.hasMany(Booking, {foreignKey:'customer_id' , as :'bookings'});

Booking.belongsTo(Chef, {foreignKey: 'chef_id', as: 'chef'});
Chef.hasMany(Booking, {foreignKey:'chef_id', as: 'bookings'});

module.exports = Booking;