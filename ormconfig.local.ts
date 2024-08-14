import { dbConfig } from './src/configs/database.config';

module.exports = (() => {
    const { port, host, username, password, dbname: database } = dbConfig();
    return {
        type: 'postgres',
        host,
        port: parseInt(port),
        database,
        username,
        password,
        entities: ['src/database/models/*.ts'],
        migrations: ['src/database/migrations/*.ts'],
        cli: {
            migrationsDir: 'src/database/migrations',
        },
    };
})();
