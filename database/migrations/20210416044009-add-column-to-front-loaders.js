"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColimn("front_loaders", "status", {
                type: Sequelize.STRING,
                allowNull: true,
            }),
        ]);
    },
};
