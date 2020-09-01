const tableName = 'urls';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(tableName, {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            url: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            short_url: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
            },
            hits: {
                type: Sequelize.INTEGER,
                default: 0,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable(tableName);
    },
};
