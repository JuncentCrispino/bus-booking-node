import environment from '../config/environment.js';
import knex from 'knex';

const sql = knex({
  client: environment.client,
  connection: environment.connection
});

export default sql;