import dotenv from "dotenv";
import type { Config } from "jest";
import nextJest from "next/jest";
dotenv.config({
  path: ".env.development",
});

const createJestConfig = nextJest({
  dir: "./",
});
const config: Config = {
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  testTimeout: 60000,
};

export default createJestConfig(config);
