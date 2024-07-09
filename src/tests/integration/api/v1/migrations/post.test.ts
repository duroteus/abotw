import { database } from "@/infra/database";
import { orchestrator } from "@/tests/orchestrator";
import fs from "fs";
import path from "path";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public");
});

describe("POST to /api/v1/migrations", () => {
  test("should return status code 201", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
      method: "POST",
    });
    const responseBody = await response.json();

    expect(response.status).toBe(201);
    expect(responseBody.length).toBeGreaterThan(0);
  });

  test("should return an array", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
      method: "POST",
    });
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBe(0);
    expect(response.status).toBe(200);
  });

  test("should have the same migrations in the folder and the database", async () => {
    const migrationsFolder = path.join("src/infra/migrations");
    const migrationFiles = fs.readdirSync(migrationsFolder);

    const migrationFileNames = migrationFiles.map((file) =>
      path.basename(file, ".js"),
    );

    const migrationsResult = await database.query(
      "SELECT name FROM pgmigrations;",
    );
    const migrationNames = migrationsResult.rows.map(
      (row: { name: string }) => row.name,
    );

    migrationFileNames.sort();
    migrationNames.sort();

    expect(migrationFileNames).toEqual(migrationNames);
  });
});
