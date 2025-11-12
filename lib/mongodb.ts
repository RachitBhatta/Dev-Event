import mongoose from "mongoose";

// Define the type for our cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global object to include our mongoose cache
// This prevents TypeScript errors when accessing global.mongoose
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Retrieve MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Returns the cached connection if one exists, otherwise creates a new connection.
 *
 * @returns {Promise<typeof mongoose>} The Mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  // If a connection already exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise doesn't exist, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable command buffering
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // Wait for the connection promise to resolve
    cached.conn = await cached.promise;
  } catch (e) {
    // If connection fails, reset the promise so it can be retried
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
