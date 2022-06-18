import environment from '../config/environment.js';
import knex from 'knex';

const sql = knex({
  client: 'mysql2',
  connection: environment.connection
});

export default sql;