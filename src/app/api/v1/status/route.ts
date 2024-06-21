import database from "@/infra/database";
import { NextRequest } from "next/server";

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
