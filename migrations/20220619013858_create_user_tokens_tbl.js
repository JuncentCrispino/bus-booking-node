import tokenTypes from '../src/config/tokenTypes.js';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const exists = await knex.schema.hasTable('user_tokens');
  if (!exists) {
    await knex.schema.createTable('user_tokens', t => {
      t.increments('id')
        .primary()
        .unsigned()
        .notNullable();
      t.string('token')
        .index()
        .notNullable;
      t.integer('user_id')
        .unsigned()
        .index()
        .notNullable()
        .references('user_id')
        .inTable('users');
      t.enu('type', [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL])
        .notNullable();
      t.datetime('expires')
        .notNullable();
      t.boolean('blacklisted')
        .defaultTo(false);
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
