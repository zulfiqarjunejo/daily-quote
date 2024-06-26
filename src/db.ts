import knex from "knex";

export const db = knex({
    client: "pg",
    connection: {
        host: process.env.PG_HOST,
        port: 5432,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
    },
    pool: { min: 0, max: 5 },
});