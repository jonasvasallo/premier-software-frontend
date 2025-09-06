const API_URL = import.meta.env.VITE_API_ROOT;

export type StockLog = {
    itemId: number;
    oldStock: number;
    newStock: number;
    createdAt: string;
}

export async function getStockLogs(itemId: number): Promise<StockLog[]> {
    const stockLogResponse = await fetch(`${API_URL}/stocklogs/${itemId}`, {headers: {Accept: "application/json"}});
        if(!stockLogResponse.ok) 
            throw new Error(`Failed to fetch stock logs data: ${stockLogResponse.statusText}`);
    return stockLogResponse.json();
}

export async function getAllStockLogs(): Promise<StockLog[]> {
    const stockLogResponse = await fetch(`${API_URL}/stocklogs`, {headers: {Accept: "application/json"}});
        if(!stockLogResponse.ok) 
            throw new Error(`Failed to fetch stock logs data: ${stockLogResponse.statusText}`);
    return stockLogResponse.json();
}