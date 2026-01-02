const {DataTypes} = require ('sequelize');
const { sequelize } = require ('../config/database');
const {Chef} = require('./Chef');

const Dish = sequelize.define('Dish', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  chef_id :{
    type: DataTypes.INTEGER,
    allowNull: false,
    
  },
  name:{
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description : {
    type: DataTypes.TEXT,
    allowNull: true
    },
    price:{
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate:{
        min: 0
      }
    }, 
   image:{
    type:  DataTypes.STRING(500),
    allowNull: true
   } 
  },{
      tableName: 'dishes',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


module.exports= Dish;