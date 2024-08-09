const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const MenuItem = sequelize.define('MenuItem', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

MenuItem.belongsTo(Category);
Category.hasMany(MenuItem);

module.exports = MenuItem;
