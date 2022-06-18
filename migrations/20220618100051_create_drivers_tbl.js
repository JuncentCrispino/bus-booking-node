/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const exists = await knex.schema.hasTable('drivers');
  if (!exists) {
    await knex.schema.createTable('drivers', t => {
      t.increments('driver_id')
        .unsigned()
        .notNullable()
        .primary();
      t.string('driver_first_name', 50)
        .notNullable();
      t.string('driver_last_name', 50)
        .notNullable();
      t.string('driver_middle_name', 50);
      t.string('driver_contact_no', 13);
      t.boolean('is_active')
        .defaultTo(true);
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
