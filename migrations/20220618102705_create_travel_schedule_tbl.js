/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const exists = await knex.schema.hasTable('travel_schedules');
  if (!exists) {
    await knex.schema.createTable('travel_schedules', t => {
      t.increments('schedule_id')
        .unsigned()
        .notNullable()
        .primary();
      t.integer('bus_id', 11)
        .unsigned()
        .index()
        .references('bus_id')
        .inTable('buses')
        .notNullable();
      t.integer('driver_id')
        .unsigned()
        .index()
        .references('driver_id')
        .inTable('drivers')
        .notNullable();
      t.string('starting_point', 250)
        .notNullable();
      t.string('destination')
        .notNullable();
      t.date('schedule_date')
        .notNullable();
      t.time('departure')
        .notNullable();
      t.datetime('estimated_arrival')
        .notNullable();
      t.float('fare_amount')
        .notNullable();
      t.integer('encoded_by')
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
