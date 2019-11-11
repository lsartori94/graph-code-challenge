import dotenv from "dotenv";

// Initialize dotenv
dotenv.config();
// Shortcut
const env = process.env;

const config = {
  port: env.SERVER_PORT || 3000
};

export default config;
