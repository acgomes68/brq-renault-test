import 'dotenv/config';
import Sequelize, { Model } from 'sequelize';

class Stat extends Model {
    static init(sequelize) {
        const { APP_URL, APP_PORT } = process.env;

        super.init(
            {
                name: Sequelize.STRING,
                path: Sequelize.STRING,
                url: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `${APP_URL}:${APP_PORT}/files/${this.path}`;
                    },
                },
            },
            {
                sequelize,
                paranoid: true,
            }
        );

        return this;
    }
}

export default Stat;
