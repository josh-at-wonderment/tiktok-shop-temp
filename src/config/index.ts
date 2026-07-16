import dotenv from "dotenv";

const devEnvironment = "development";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
};

export default {
  appEnv: {
    env: requireEnv("NODE_ENV"),
    isDev: process.env.NODE_ENV === devEnvironment,
  },
  server: {
    port: requireEnv("SERVER_PORT"),
  },
  corsList: process.env.CORS_LIST?.split(","),
};
