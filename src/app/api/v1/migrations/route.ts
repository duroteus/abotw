import database from "@/infra/database";
import { NextRequest } from "next/server";
import migrationRunner from "node-pg-migrate";
import { MigrationDirection } from "node-pg-migrate/dist/types";
import { join } from "node:path";

const getDefaultMigrationOptions = async (dryRun: boolean) => {
  const dbClient = await database.getNewClient();
  return {
    dbClient: dbClient,
    dryRun: dryRun,
    dir: join(process.cwd(), "src", "infra", "migrations"),
    direction: "up" as MigrationDirection,
    verbose: true,
    migrationsTable: "pgmigrations",
  };
};

export const GET = async (req: NextRequest) => {
  const defaultMigrationOptions = await getDefaultMigrationOptions(true);
  const pendingMigrations = await migrationRunner(defaultMigrationOptions);
  await defaultMigrationOptions.dbClient.end();

  return new Response(JSON.stringify(pendingMigrations), {
    status: 200,
  });
};

export const POST = async () => {
  const defaultMigrationOptions = await getDefaultMigrationOptions(false);
  const migratedMigrations = await migrationRunner({
    ...defaultMigrationOptions,
    dryRun: false,
  });
  await defaultMigrationOptions.dbClient.end();

  const statusCode = migratedMigrations.length > 0 ? 201 : 200;

  return new Response(JSON.stringify(migratedMigrations), {
    status: statusCode,
  });
};
