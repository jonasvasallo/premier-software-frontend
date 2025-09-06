const API_ROOT = import.meta.env.VITE_API_ROOT;

export type Sale = {
    id: number;
    purchaseDate: string;
    unitsSold: number;
    itemId: number;
}

export async function getSales(): Promise<Sale[]> {
    const salesResponse = await fetch(`${API_ROOT}/sales`,{
        headers: {Accept: "application/json"}
    });

    if(!salesResponse.ok)
         throw new Error(`Failed to fetch sales data: ${salesResponse.statusText}`);

    return salesResponse.json();
}

export async function createSale(newSale: Sale): Promise<Sale> {
  const payload = {
    purchaseDate: new Date(newSale.purchaseDate).toISOString(),
    unitsSold: Number(newSale.unitsSold),
    itemId: Number(newSale.itemId),
  };

  const res = await fetch(`${API_ROOT}/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();

  if (res.ok) {
    return JSON.parse(text) as Sale;
  }

  try {
    const json = JSON.parse(text);
    if (json.errors) {
      const messages = Object.values(json.errors).flat().join(", ");
      throw new Error(messages);
    }
    throw new Error(json.title || json.detail || "Unknown server error");
  } catch {
    throw new Error(text || `HTTP ${res.status} ${res.statusText}`);
  }
}

