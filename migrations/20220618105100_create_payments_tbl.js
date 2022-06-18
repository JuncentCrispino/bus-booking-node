/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const exists = await knex.schema.hasTable('payments');
  if (!exists) {
    await knex.schema.createTable('payments', t => {
      t.increments('payment_id')
        .unsigned()
        .notNullable()
        .primary();
      t.integer('booking_id')
        .unsigned()
        .index()
        .references('booking_id')
        .inTable('bookings')
        .notNullable();
      t.float('amount_paid')
        .notNullable();
      t.datetime('payment_date')
        .notNullable();
      t.string('payment_mode', 50)
        .notNullable();
      t.string('proof_of_payment');
      t.uuid('transaction_id', 15)
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
