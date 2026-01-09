import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "./db";

const connection = await connectToDatabase();

if (!connection || !connection.db) {
    throw new Error("Database not connected");
}

export const auth = betterAuth({
    database: mongodbAdapter(connection.db, {
        client: connection.getClient(),
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
});
