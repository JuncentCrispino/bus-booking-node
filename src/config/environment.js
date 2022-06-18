import Joi from 'joi';

const envVarSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(8000),
    DB_HOST: Joi.string().required().description('Mysql database host.'),
    DB_NAME: Joi.string().required().description('Mysql database name.'),
    DB_USER: Joi.string().required().description('Mysql database username.'),
    DB_PASSWORD: Joi.string().required().description('Mysql database password.'),
    DB_PORT: Joi.number().default(3306),
    JWT_TOKEN_SECRET: Joi.string().required().description('Secret for creating access token.'),
    LOG_DIR: Joi.string().required().description('Directory for the logger.'),
    LOG_FORMAT: Joi.string().required().description('Format for morgan middleware').default('dev')
  })
  .unknown();

const { value: envVars, error } = envVarSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`ENV validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  connection: {
    database: envVars.DB_NAME,
    host: envVars.DB_HOST,
    user: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    port: envVars.DB_PORT
  },
  jwt: {
    secret: envVars.JWT_TOKEN_SECRET
  },
  logDirectory: envVars.LOG_DIR,
  logFormat: envVars.LOG_FORMAT
};