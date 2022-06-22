/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const exists = await knex.schema.hasTable('user_permissions');
  if (!exists) {
    await knex.schema.createTable('user_permissions', t => {
      t.integer('user_id')
        .unsigned()
        .index()
        .notNullable()
        .references('user_id')
        .inTable('users');
      t.integer('permission_id')
        .unsigned()
        .index()
        .notNullable()
        .references('permission_id')
        .inTable('permissions');
    });
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {

}
