import mongoose, { ConnectOptions } from "mongoose";

// Define the type for our cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}


/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 * Uses globalThis for better cross-environment compatibility.
 */
const globalForMongoose = globalThis as typeof globalThis & {
  mongoose?: MongooseCache;
};

let cached: MongooseCache = globalForMongoose.mongoose || { conn: null, promise: null };

if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Returns the cached connection if one exists, otherwise creates a new connection.
 *
 * @returns {Promise<typeof mongoose>} The Mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  // Validate MongoDB URI
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  // If a connection already exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise doesn't exist, create one
  if (!cached.promise) {
    // Properly typed connection options for Mongoose v6+
    const opts: ConnectOptions = {
      bufferCommands: false, // Disable command buffering for immediate errors
    };

    // Connect to MongoDB (MONGODB_URI is validated above)
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB connected successfully");
      return mongoose;
    });
  }

  try {
    // Wait for the connection promise to resolve
    cached.conn = await cached.promise;
  } catch (e) {
    // If connection fails, reset the promise so it can be retried
    cached.promise = null;
    console.error("❌ MongoDB connection failed:", e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;