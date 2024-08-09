const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('restaurant_db', 'root', 'Pandey@131', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

module.exports = sequelize;
