import { DataSource, DataSourceOptions } from "typeorm";

import {
  MYSQL_CONNECTION,
  MYSQL_HOST,
  MYSQL_DB,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USER,
  NODE_ENV,
} from "../config/config";

let baseFolder = "src";
baseFolder = NODE_ENV == "production" ? "dist" : "src";
const typeormConfig = {
  type: MYSQL_CONNECTION,
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
  synchronize: true, //keep true just for development
  entities: [`${baseFolder}/models/*{.js,.ts}`],
  migrations: [],
  subscribers: [],
  migrationsTableName: "seed",
} as DataSourceOptions;

const AppDataSource = new DataSource(typeormConfig);

export default AppDataSource;
