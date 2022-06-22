/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const exists = await knex.schema.hasTable('permissions');
  if (!exists) {
    await knex.schema.createTable('permissions', t => {
      t.increments('permission_id')
        .unsigned()
        .notNullable()
        .primary();
      t.string('permission_name')
        .notNullable();
      t.string('permission_description');
    });
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {

}
