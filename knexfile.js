// Update with your config settings.
import 'dotenv/config';
import environment from './src/config/config.js';
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

export default {

  development: {
    client: environment.client,
    connection: environment.connection
  }

};
