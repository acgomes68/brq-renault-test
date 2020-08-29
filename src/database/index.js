import Sequelize from 'sequelize';

import User from '../app/models/User';
import Url from '../app/models/Url';
import Stat from '../app/models/Stat';

import databaseConfig from '../config/database';

const models = [User, Url, Stat];

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
