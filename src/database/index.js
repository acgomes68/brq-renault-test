import Sequelize from 'sequelize';

import User from '../app/models/User';
import Url from '../app/models/Url';

import databaseConfig from '../config/database';

const models = [User, Url];

class Database {
    constructor() {
        this.init();
    }

    init() {
        const postgresConfig = databaseConfig.postgres;
        this.connection = new Sequelize(postgresConfig);
        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
