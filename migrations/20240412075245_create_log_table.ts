import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("log", function (table) {
        table.increments();
        table.string("message").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("log");
}

