import { config } from "./deps.ts";
import { Client } from "./deps.ts";

const env = config();

const client = await new Client().connect({
  hostname: env.DB_HOST,
  username: env.DB_USER,
  db: env.DB_NAME,
  password: env.DB_PASSWORD,
});


async function createUsersTable() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `);
}

await createUsersTable();

export default client;
