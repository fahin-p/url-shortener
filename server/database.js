const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (!sequelize) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mssql',
    dialectOptions: { options: { encrypt: true } },
    logging: false
  });
}

module.exports = sequelize;
