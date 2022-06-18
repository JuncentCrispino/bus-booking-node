/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const exists = await knex.schema.hasTable('buses');
  if (!exists) {
    await knex.schema.createTable('buses', t => {
      t.increments('bus_id')
        .unsigned()
        .primary();
      t.string('bus_number', 11)
        .notNullable()
        .index();
      t.string('bus_plate_number', 11)
        .notNullable();
      t.boolean('is_air_conditioned')
        .notNullable();
      t.integer('capacity', 3)
        .notNullable();
      t.boolean('is_active')
        .defaultTo(true);
      t.integer('user_id')
        .unsigned()
        .index()
        .references('user_id')
        .inTable('users')
        .notNullable();
      t.timestamps(true, true);
    });
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {

}
