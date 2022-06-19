import tokenTypes from '../src/config/tokenTypes.js';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const exists = await knex.schema.hasTable('customer_tokens');
  if (!exists) {
    await knex.schema.createTable('customer_tokens', t => {
      t.increments('id')
        .primary()
        .unsigned()
        .notNullable();
      t.string('token')
        .index()
        .notNullable;
      t.integer('customer_id')
        .unsigned()
        .index()
        .notNullable()
        .references('customer_id')
        .inTable('customers');
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
