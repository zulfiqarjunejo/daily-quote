import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
    all: {
        client: "postgresql",
        connection: {
            database: process.env.PG_DATABASE,
            host: process.env.PG_HOST,
            password: process.env.PG_PASSWORD,
            user: process.env.PG_USER,
            ssl: false
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        },
    }
};

module.exports = config;
