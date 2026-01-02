const {DataTypes} = require ('sequelize');
const {sequelize} = require ('../config/database');
const User = require ('./User');

const Customer = sequelize.define('Customer',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
   
  },
  phone:{
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING(255)  // Add this - you forgot it!
  }
},{
  tableName: 'customers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


module.exports = Customer;
