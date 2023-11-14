const express = require("express");
// const mongoose = require("mongoose");
const redis = require("redis");
const { Pool, Client } = require("pg");
// init app
const PORT = 3000;
const app = express();

// connect redis
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;

const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Connected to Redis..."));
redisClient.connect();

// connect postgresql db
const POSTGRES_DB_PORT = process.env.POSTGRES_DB_PORT;
const POSTGRES_DB_USER = process.env.POSTGRES_DB_USER;
const POSTGRES_DB_PASSWORD = process.env.POSTGRES_DB_PASSWORD;
const POSTGRES_DB_HOST = process.env.POSTGRES_DB_HOST;
const POSTGRES_DB = process.env.POSTGRES_DB;
const URI=`postgresql://${POSTGRES_DB_USER}:${POSTGRES_DB_PASSWORD}@${POSTGRES_DB_HOST}:${POSTGRES_DB_PORT}`;

const client = new Client({
  connectionString: URI,
});

client
  .connect()
  .then(() => console.log("success connected to postgres db..."))
  .catch((err) => console.log("fail connected to postgres db..." + err));

// connect mongo db
// const MONGO_DB_PORT = process.env.MONGO_DB_PORT;
// const MONGO_DB_USER = process.env.MONGO_DB_USER;
// const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
// const MONGO_DB_HOST = process.env.MONGO_DB_HOST;
// const MONGO_DB = process.env.MONGO_DB;
// const URI=`mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}`;

// mongoose
//   .connect(URI)
//   .then(() => console.log("success connected to mongodb..."))
//   .catch((err) => console.log("fail connected to mongodb..." + err));

app.get("/", (req, res) => res.send("<h1> Hello Ahmad alkaddah</h1>"));

app.listen(PORT, () => console.log(`app is up and running on port: ${PORT}`));
