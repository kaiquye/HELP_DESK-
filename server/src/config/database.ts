import "dotenv/config";
import connection from "knex";

const config = {
  client: "mysql",
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
};
export default connection(config);
