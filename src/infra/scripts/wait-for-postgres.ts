const { exec } = require("node:child_process");

const barFrames = ["/", "-", "\\", "|"];
let i = 0;

const interval = setInterval(() => {
  process.stdout.write(
    `\r 🔴 Aguardando postgres aceitar conexões  ${barFrames[i++ % barFrames.length]}`,
  );
}, 200);

function checkPostgres(): void {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error: Error | null, stdout: string): void {
    if (stdout.search("accepting connections") === -1) {
      setTimeout(checkPostgres, 1000);
      return;
    }

    clearInterval(interval);

    console.log("\n\n 🟢 Postgres está pronto e aceitando conexões.\n");
  }
}

process.stdout.write("\n\n");

checkPostgres();
