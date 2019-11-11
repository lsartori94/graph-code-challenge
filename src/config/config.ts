import dotenv from "dotenv";

// Initialize dotenv
dotenv.config();

const config = {
  port: process.env.PORT || 8080
};

export default config;
