import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const response = new Response(
    JSON.stringify({ chave: "são acima da média" }),
    {
      status: 200,
    },
  );
  return response;
};
