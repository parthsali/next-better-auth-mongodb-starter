import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in env variables");
}

// Use native MongoDB client for Better Auth (separate from Mongoose)
const client = new MongoClient(MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
    // Note: Not passing 'client' to disable transactions (requires replica set)
    database: mongodbAdapter(db),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
});
