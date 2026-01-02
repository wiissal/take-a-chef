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
    type: DataTypes.INTIGER,
    allowNull: false,
    unique: true,
    references:{
      model: 'users',
      key: 'id'
    }
  },
  phone:{
    type: DataTypes.STRING(20),
    allowNull: true,
  },
},{
  tableName: 'customers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Customer.belongsTo(User, { foreignKey: 'user_id', as: 'user'});
User.hasOne(Customer, { foreignKey: 'user_id' , as : 'costumer'});

module.exports = Customer;
