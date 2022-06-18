/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const exists = await knex.schema.hasTable('bookings');
  if (!exists) {
    await knex.schema.createTable('bookings', t => {
      t.increments('booking_id')
        .unsigned()
        .notNullable()
        .primary();
      t.integer('schedule_id')
        .unsigned()
        .index()
        .references('schedule_id')
        .inTable('travel_schedules')
        .notNullable();
      t.integer('customer_id')
        .unsigned()
        .index()
        .references('customer_id')
        .inTable('customers')
        .notNullable();
      t.integer('number_of_seats', 3)
        .notNullable();
      t.float('fare_amount')
        .notNullable();
      t.float('total_amount')
        .notNullable();
      t.datetime('date_of_booking')
        .notNullable();
      t.boolean('is_booking_approved')
        .notNullable()
        .defaultTo(false);
      t.integer('encoded_by')
        .unsigned()
        .index()
        .references('user_id')
        .inTable('users')
        .notNullable();
    });
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {

}
