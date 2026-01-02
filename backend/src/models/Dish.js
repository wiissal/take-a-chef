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
    type: DataTypes.INTIGER,
    allowNull: false,
    references:{
      model: 'chefs',
      key: 'id',
    }
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

//define relationships
Dish.belongsTo(Chef , {foreignKey: 'chef_id', as : 'chef'});
Chef.hasMany(Dish, {foreignKey: 'chef_id', as : 'dishes'});

module.exports= Dish;