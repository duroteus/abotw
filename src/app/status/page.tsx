"use client";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import useSWR from "swr";

import ServicesInfos from "@/components/services-info";
import { fetchAPI } from "@/hooks/fetch-api";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface StatusResponse {
  updated_at: string;
  dependencies: {
    database: {
      version: string;
      max_connections: number;
      opened_connections: number;
    };
  };
}

export default function StatusPage() {
  const [loadingText, setLoadingText] = useState("Carregando");
  const { isLoading, data } = useSWR(
    "/api/v1/status",
    fetchAPI<StatusResponse>,
  );
  const lastUpdated = dayjs(data?.updated_at);
  const timeAgo = lastUpdated.fromNow();

  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      count = (count % 3) + 1;
      setLoadingText(`Carregando${".".repeat(count)}`);
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full min-h-[300px]">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Status dos Serviços
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Última atualização: {timeAgo}
        </p>

        {isLoading ? (
          <p className="text-lg mt-10 font-semibold">{loadingText}</p>
        ) : (
          <div className="bg-gray-100 rounded-md p-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Banco de Dados
            </h3>
            <ul className="space-y-2">
              <ServicesInfos
                label="Versão:"
                data={data?.dependencies.database.version}
              />
              <ServicesInfos
                label="Conexões máximas:"
                data={data?.dependencies.database.max_connections}
              />
              <ServicesInfos
                label="Conexões abertas:"
                data={data?.dependencies.database.opened_connections}
              />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
