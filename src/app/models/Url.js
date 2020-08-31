import Sequelize, { Model } from 'sequelize';

class Url extends Model {
    static init(sequelize) {
        super.init(
            {
                hits: Sequelize.INTEGER,
                hash: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

export default Url;
