const { buildSchema } = require("graphql");
const { products, categories } = require("../database/models");
const { Op } = require("sequelize");

const schema = buildSchema(`
    type Product {
        id: ID,
        name: String
        articul: String
        slug: String
        picture: String
        category: String
    }

    type Query {
        productssearch(search: String!): [Product]
    }
`);

const root = {
    productssearch: async ({ search }) => {
        const serachValue = search.trim();

        if(serachValue) {
            const { rows } = await products.findAndCountAll({
                where: {
                    [Op.or]: [
                        { 
                            articul: {
                                [Op.like]: `%${serachValue}%`,
                            }
                        },
                        {
                            "heading.title": {
                                [Op.like]: `%${serachValue}%`
                            }
                        }
                    ]
                },
                include: [{
                    model: categories,
                    as: "category",
                }],
            });

            const data = rows.map(({ id, heading, articul, slug, picture, category }) => ({
                id,
                name: heading.title,
                articul,
                slug,
                picture: JSON.stringify(picture),
                category: JSON.stringify(category)
            }));

            return data;
        } else {
            return [];
        }
    },
};

module.exports = { schema, root };