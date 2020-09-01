import Sequelize, { Model } from 'sequelize';

class Url extends Model {
    static init(sequelize) {
        super.init(
            {
                url: Sequelize.STRING,
                shortUrl: Sequelize.STRING,
                hits: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
}

export default Url;
