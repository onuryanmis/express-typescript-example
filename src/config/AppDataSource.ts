import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "express_typescript_database",
    entities: ["src/entity/*.js"],
    migrations: ["src/migration/*.js"],
    migrationsTableName: "migrations",
    logging: true,
    synchronize: true,
})

export default AppDataSource;