const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const dbConfig = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    dbName: "tweets",
    useUnifiedTopology: true,
  });

  mongoose.connection.on("error", (err) => {
    console.error("An error occurred trying to connect to the database", err);
    process.exit(1);
  });

  mongoose.connection.on("connected", () => {
    console.info("Successfully connected to the database");
  });

  mongoose.connection.on("disconnected", () => {
    console.info("Successfully disconnected from the database");
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
    console.info("Successfully disconnected mongodb");
    process.exit(0);
  });

  await Promise.all(
    Object.values(mongoose.models).map((model) => model.createIndexes())
  );
};

module.exports = dbConfig;
