const {DataTypes} = require ('sequelize');
const {sequelize} = require('../config/database');
const User = require('./User');

const Chef = sequelize.define('Chef',{
  id:{
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
      key:'id'
    }
  },
  bio:{
    type: DataTypes.TEXT,
    allowNull: true
  },
  photo:{
    type: DataTypes.STRING(500),
    allowNull: true
  },
  speciality:{
    type: DataTypes.STRING(100),
    allowNull: true
  },
  rating:{
    type: DataTypes.DECIMAL(3,2),
    defaultValue: 0.00,
    validate:{
      min:0,
      max:5
    }
  },
  total_reviews:{
      type: DataTypes.INTEGER,
    defaultValue: 0
  }
},{
  tableName: 'chefs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

//define relationships
Chef.belongsTo(User,{foreignKey: ' user_id', as: 'user'});
User.hasOne(Chef, {foreignKey: 'user_id', as: 'chef'});

module.exports= Chef