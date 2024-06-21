import { NextRequest } from "next/server";
import database from "../../../../infra/database";

export const GET = async (req: NextRequest) => {
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  const response = new Response(
    JSON.stringify({ chave: "são acima da média" }),
    {
      status: 200,
    },
  );
  return response;
};
