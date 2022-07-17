const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env;

module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  autoLoadEntities: true,
  entities: ['dist/entities/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
};
