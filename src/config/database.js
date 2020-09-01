require('dotenv').config({
    path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

const {
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWD,
    POSTGRES_DATABASE,
} = process.env;

module.exports = {
    postgres: {
        dialect: 'postgres',
        host: POSTGRES_HOST,
        username: POSTGRES_USER,
        password: POSTGRES_PASSWD,
        database: POSTGRES_DATABASE,
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
        },
        pool: {
            max: 100,
            min: 0,
            idle: 200000,
            // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
            acquire: 1000000,
        },
    },
    development: {
        dialect: 'postgres',
        host: 'postgres',
        username: POSTGRES_USER,
        password: POSTGRES_PASSWD,
        database: POSTGRES_DATABASE,
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
        },
        pool: {
            max: 100,
            min: 0,
            idle: 200000,
            // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
            acquire: 1000000,
        },
    },
};
