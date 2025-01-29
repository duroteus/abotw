export async function fetchAPI<T>(key: string): Promise<T> {
  const response = await fetch(key);

  if (!response.ok) {
    throw new Error("Erro ao buscar status");
  }

  const responseBody = await response.json();
  return responseBody;
}
