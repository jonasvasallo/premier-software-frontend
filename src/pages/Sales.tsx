import { AddOutlined, Paid } from "@mui/icons-material"
import Button from "../components/Button"
import { useEffect, useState } from "react";

import type { Item } from "../api/items_service";
import type { Sale } from "../api/sales_service";
import { getSales, createSale } from "../api/sales_service";
import { getItems } from "../api/items_service";
import Modal from "../components/Modal";
import InputField from "../components/InputField";

import { formatDate, formatCurrency } from "../utils/format_utils";

function Sales() {
    const [sales, setSales] = useState<Sale[]>([]);
    const [itemsMap, setItemsMap] = useState<Record<number, Item>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [openCreateSalesModal, setOpenCreateSalesModal] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function fetchSales(){
            setLoading(true);
            setError(null);

            try{
                const salesData = await getSales();
                if(cancelled) return;
                setSales(salesData);

                const salesNotEmpty = salesData.length > 0;

                if(salesNotEmpty){
                    const itemsData = await getItems();
                    if(cancelled) return;

                    const itemsMap: Record<number, Item> = {};
                    itemsData.forEach((item) => (itemsMap[item.id] = item));
                    setItemsMap(itemsMap);
                }
            } catch(error){
                console.error(error);
                setError((error as Error)?.message ?? "Unknown error");
            } finally {
                if(!cancelled) setLoading(false);
            }
        }
        
        fetchSales();
        return () => { cancelled = true; }
    }, []);

    async function sendSalesForm(formData : FormData) {
        const item_id : number = Number(formData.get("prod_id"));
        const qty : number = Number(formData.get("qty"));
        if(isNaN(item_id) || isNaN(qty)) {
            alert("Invalid! Check your inputs.");
            return;
        }

        const newSale: Sale = {
            id: 0,
            purchaseDate: new Date().toISOString(),
            unitsSold: qty,
            sellingPrice: itemsMap[item_id]?.price ?? 0,
            itemId: item_id,
        }
        
        try {
            await createSale(newSale);
            alert("Sale record created!");
            window.location.reload()
        } catch (error) {
            alert(`Failed to create sale record: ${(error as Error).message}`);
        }

    }

  return (
    <>
        <div className='flex justify-between'>
            <span className='text-2xl font-bold text-gray-600'>Sales</span>
            <Button name='Record a Sale' onClick={() => setOpenCreateSalesModal(true)} Icon={Paid}/>
        </div>
        <div className="bg-white rounded-lg min-h-[500px] mt-4">
            <div className="p-2">
                {loading && <div className="p-4">Loading sales…</div>}
                {error && <div className="p-4 text-red-600">Error: {error}</div>}
                
            </div>
            {!loading && !error && sales.length === 0 ? <div className="p-4">No sales found.</div> :
            <table className='w-full'>
                <thead className='text-xs text-gray-800 border-b-1 border-b-gray-300 table-header-group'>
                    <tr>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>ID</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Product Name</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Unit Price</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Units Sold</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Total</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Purchase Date</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => {
                    const item = itemsMap[sale.itemId];

                    return (
                    <tr
                        key={sale.id}
                        className="text-gray-800 border-b-1 border-b-gray-300 text-xs font-medium hover:bg-blue-50"
                    >
                        <td className="p-4 text-xs text-blue-400 font-semibold text-left">{sale.id}</td>

                        <td className="p-4 text-xs text-gray-700 text-left flex gap-2 items-center">
                        <span>{item?.name ?? `Item #${sale.itemId ?? "?"}`}</span>
                        </td>

                        <td className="p-4 text-xs text-gray-700 text-left">
                        {formatCurrency(sale.sellingPrice)}
                        </td>

                        <td className="p-4 text-xs text-gray-700 text-left">{sale.unitsSold}</td>

                        <td className="p-4 text-xs text-gray-700 text-left">{formatCurrency(sale.sellingPrice * sale.unitsSold)}</td>

                        <td className="p-4 text-xs text-gray-700 text-left">{formatDate(sale.purchaseDate)}</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            
            }
            
        </div>
        <Modal open={openCreateSalesModal} onClose={() => setOpenCreateSalesModal(false)}>
            <div>
                <span className="block font-bold text-lg text-gray-700">New Sales Record</span>
                <span className="block font-medium text-md text-gray-500">Quickly log a new sale by providing the required information below.</span>
                <form action={sendSalesForm} method="POST">
                    <div className="flex gap-2">
                        <InputField name="prod_id" type="number" placeholder="Product ID"/>
                        <InputField name="qty" type="number" placeholder="Units Sold" min={1} max={999} textStyle="w-full"/>
                    </div>
                    <Button name="Add Record" type="submit" buttonStyle="mt-4"/>
                </form>
            </div>
        </Modal>
    </>
  )
}

export default Sales