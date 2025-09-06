const API_URL = import.meta.env.VITE_API_ROOT;

export type Item = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
    imagePath?: string | null;
}

export async function getItems(): Promise<Item[]> {
    const itemResponse = await fetch(`${API_URL}/items`, {headers: {Accept: "application/json"}});
        if(!itemResponse.ok) 
            throw new Error(`Failed to fetch items data: ${itemResponse.statusText}`);
    return itemResponse.json();
}

export async function updateItemStock(itemId: number, newStock: number): Promise<Item> {

    const itemResponse = await fetch(`${API_URL}/items/${itemId}/stock/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: newStock }),
    });

    const text = await itemResponse.text();

    if (itemResponse.ok) {
        return JSON.parse(text) as Item;
    }

    try{
        const json = JSON.parse(text);
        if (json.errors) {
            const messages = Object.values(json.errors).flat().join(", ");
            throw new Error(messages);
        }
        throw new Error(json.title || json.detail || "Unknown server error");
    } catch(error){
        throw new Error(text || `HTTP ${itemResponse.status} ${itemResponse.statusText}`);
    }


}

export async function updateItem(itemId: number, name: string, price: number, description: string): Promise<Item | void> {
    const itemResponse = await fetch(`${API_URL}/items/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, description }),
    });

    const text = await itemResponse.text();
    if (itemResponse.status === 204){
        alert("Changes saved successfully");
        return;
    }
    if (itemResponse.ok) {
        return JSON.parse(text) as Item;
    }

    try{
        const json = JSON.parse(text);
        if (json.errors) {
            const messages = Object.values(json.errors).flat().join(", ");
            throw new Error(messages);
        }
        throw new Error(json.title || json.detail || "Unknown server error");
    } catch(error){
        throw new Error(text || `HTTP ${itemResponse.status} ${itemResponse.statusText}`);
    }
}

export async function deleteItem(itemId: number): Promise<void> {
    const itemResponse = await fetch(`${API_URL}/items/${itemId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

    if(!itemResponse.ok){
        throw new Error(`Failed to delete item: ${itemResponse.statusText}`);
    }
        
    return Promise.resolve(void 0);
}

export async function createItem(name: string, price: number, stock: number, description: string): Promise<Item>{
    const itemResponse = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, stock, description}),
    });
    const text = await itemResponse.text();

    if (itemResponse.ok) {
        return JSON.parse(text) as Item;
    }
    try{
        const json = JSON.parse(text);  
        if (json.errors) {
            const messages = Object.values(json.errors).flat().join(", ");
            throw new Error(messages);
        }
        throw new Error(json.title || json.detail || "Unknown server error");
    } catch(error){
        throw new Error(text || `HTTP ${itemResponse.status} ${itemResponse.statusText}`);
    }
}

export async function fetchNoStockItems(): Promise<Item[]> {
    const itemResponse = await fetch(`${API_URL}/items/nostock`, {headers: {Accept: "application/json"}});
        if(!itemResponse.ok) 
            throw new Error(`Failed to fetch no stock items data: ${itemResponse.statusText}`);
    return itemResponse.json();
}