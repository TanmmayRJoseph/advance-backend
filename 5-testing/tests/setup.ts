import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: MongoMemoryServer | null = null;

beforeAll(async () => {
  try {
    mongo = await MongoMemoryServer.create({
      binary: {
        version: "6.0.5", // smaller & faster
      },
    });
    const uri = mongo.getUri();

    await mongoose.connect(uri);
  } catch (err) {
    console.error("DB Setup Error:", err);
  }
});

afterAll(async () => {
  await mongoose.connection.close();

  if (mongo) {
    await mongo.stop();
  }
});

afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

jest.setTimeout(60000); // 30 seconds (default is 5s, which can be too short for DB setup)
