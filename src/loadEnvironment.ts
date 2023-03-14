import * as dotenv from "dotenv";

dotenv.config();

export const {
  JWT_SECRET: secret,
  SUPABASE_URL: supabaseUrl,
  SUPABASE_KEY: supabaseKey,
  SUPABASE_ID: supabaseId,
} = process.env;
