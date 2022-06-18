/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const exists = await knex.schema.hasTable('users');
  if (!exists) {
    await knex.schema.createTable('users', t => {
      t.increments('user_id')
        .primary()
        .unsigned()
        .notNullable();
      t.string('first_name', 50)
        .notNullable();
      t.string('last_name', 50)
        .notNullable();
      t.string('middle_name', 50);
      t.string('email_address', 50)
        .notNullable()
        .unique();
      t.string('password', 50)
        .notNullable();
      t.string('job_title', 50)
        .notNullable();
      t.string('user_contact_no', 13);
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
