

const CI_DB_USERNAME = process.env.CI_DB_USERNAME;
const CI_DB_PASSWORD = process.env.CI_DB_PASSWORD;
const CI_DB_NAME = process.env.CI_DB_NAME;
const CI_DB_HOST = process.env.CI_DB_HOST;
const HASH_SECRET = process.env.HASH_SECRET;
const SITE_URL = process.env.SITE_URL;

module.exports = {
    CI_DB_USERNAME,
    CI_DB_PASSWORD,
    CI_DB_NAME,
    CI_DB_HOST,
    HASH_SECRET,
    SITE_URL,
};
