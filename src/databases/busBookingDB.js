import config from '../config/config.js';
import knex from 'knex';

const sql = knex({
  client: config.client,
  connection: config.connection
});

export default sql;