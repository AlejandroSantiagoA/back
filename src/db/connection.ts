import { Sequelize } from "sequelize";

const sequelize = new Sequelize('rrhh','root','AleX250911-',{
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;