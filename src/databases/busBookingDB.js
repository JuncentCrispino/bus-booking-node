import environment from '../config/environment';
import knex from 'knex';

const sql = knex({
  client: 'mysql2',
  connection: environment.connection
});

export default sql;