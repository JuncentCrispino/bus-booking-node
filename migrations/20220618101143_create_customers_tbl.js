/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const exists = await knex.schema.hasTable('customers');
  if (!exists) {
    await knex.schema.createTable('customers', t => {
      t.increments('customer_id', 11)
        .unsigned()
        .notNullable()
        .primary();
      t.string('customer_first_name', 50)
        .notNullable();
      t.string('customer_last_name', 50)
        .notNullable();
      t.string('customer_middle_name', 50);
      t.string('customer_contact_no', 13);
      t.string('customer_email_address', 50)
        .notNullable()
        .unique();
      t.string('password', 50)
        .notNullable();
      t.boolean('is_active')
        .defaultTo(true);
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
