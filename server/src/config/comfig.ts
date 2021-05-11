export const config = () => ({
   database: {
       "type": "mysql",
       "host": process.env.DB_HOST,
       "port": process.env.DB_PORT,
       "username": process.env.DB_USERNAME,
       "password": process.env.DB_PASSWORD,
       "database": process.env.DB_DATABASE,
       "entities": ["dist/**/*.entity{.ts,.js}"],
       "dropSchema": false,
       "synchronize": process.env.SYNCHRONIZE,
       "migrationsRun": false,
       "logging": true,
       "migrationsTableName": "",
       "migrations": ["dist/modules/database/migrations/*{.ts,.js}"],
       "cli": {
           "migrationsDir": "src/modules/database/migrations"
       }
   }
});
