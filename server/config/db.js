const { config } = require("dotenv");
const { Pool } = require("pg");
require("dotenv").config();
config();

const pool = new Pool({
    connectionString: "postgresql://edunexus_user:UsKnNqeuOnOqKfMRVl9DN9aVjwDSUw7a@dpg-csqdt0ggph6c73eaviqg-a.singapore-postgres.render.com/edunexus" + "?sslmode=require",
    ssl: {
      rejectUnauthorized: require  // This allows the connection without certificate validation
    }
  });
// pool
//   .connect()
//   .then(() => console.log("Connected to PostgreSQL"))
//   .catch((err) => {
//     console.error("Error connecting to PostgreSQL:", err.message);
//     process.exit(1);
//   });

  module.exports = pool;



// const { config } = require("dotenv");
// const { Pool } = require("pg");
// require("dotenv").config();
// config();

// const pool = new Pool({

//   user: "postgres",
//   password: "Jaimin@123",
//   database: "EduNexus",
//   host: "localhost",
//   port: 5432,
// //   connectionString: process.env.DATABASE_URL,
// //   ssl: true, 
// });

//   module.exports = pool;