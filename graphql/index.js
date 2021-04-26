const { buildSchema } = require("graphql");
const { products } = require("../database/models");
const { Op } = require("sequelize");

const schema = buildSchema(`
    type Product {
        id: ID,
        name: String
        articul: String
        slug: String
        picture: String
    }

    type Query {
        productssearch(search: String!): [Product]
    }
`);

const root = {
    productssearch: async ({ search }) => {
        const { rows } = await products.findAndCountAll({
            where: {
                [Op.or]: [
                    { 
                        articul: {
                            [Op.like]: `%${search}%`,
                        }
                    },
                    {
                        "heading.title": {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            },
        });

        const data = rows.map(({ id, heading, articul, slug, picture }) => ({
            id,
            name: heading.title,
            articul,
            slug,
            picture: JSON.stringify(picture),
        }));

        return data;
    },
};

module.exports = { schema, root };