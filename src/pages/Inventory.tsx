import Modal from '../components/Modal'
import IconButton from '../components/IconButton'
import { ContentPasteGo } from '@mui/icons-material'
import { useEffect, useState } from 'react';
import type { Item } from '../api/items_service';
import { getItems, updateItemStock } from '../api/items_service';
import { formatCurrency, formatDate } from '../utils/format_utils';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { getStockLogs, type StockLog } from '../api/stock_logs_service';

function Inventory() {
    const [inventory, setInventory] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const [stockLog, setStockLog] = useState<StockLog[]>([]);
    const [loadingLogs, setLoadingLogs] = useState(false);
    const [errorLogs, setErrorLogs] = useState<string | null>(null);

    async function loadStockLogs(itemId: number) {
        setLoadingLogs(true);
        setErrorLogs(null);

        try {
            const stockLogData = await getStockLogs(itemId);
            setStockLog(stockLogData);
            
        } catch(error){
            console.error(error);
            setErrorLogs((error as Error)?.message ?? "Unknown error");
        } finally {
            setLoadingLogs(false);
        }
    }

    useEffect(() => {
        let cancelled = false;

        async function loadInventory(){
            setLoading(true);
            setError(null);

            try{
                const inventoryData = await getItems();
                if(cancelled) return;
                setInventory(inventoryData);
            } catch(error){
                console.error(error);
                setError((error as Error)?.message ?? "Unknown error");
            } finally {
                if(!cancelled) setLoading(false);
            }
        }

        loadInventory();
        return () => {cancelled = true;}
    }, []);

    async function handleUpdateStock(formData: FormData){
        if(selectedItem == null) return alert("No item selected");
        const item_id = selectedItem.id;
        const stock = Number(formData.get("stock"));
        if(isNaN(stock) || stock < 0) {
            alert("Invalid stock value");
            return;
        };

        try{
            await updateItemStock(item_id, stock);
            alert("Stock updated successfully");
            window.location.reload()
        } catch(error){
            alert(`Failed to update inventory: ${(error as Error).message}`);
        }
    }
    
  return (
    <>
        <span className='text-2xl font-bold text-gray-600'>Inventory</span>
        <div className="bg-white rounded-lg min-h-[500px] mt-4">
            <div className="p-2">
                {loading && <div className="p-4">Loading inventory…</div>}
                {error && <div className="p-4 text-red-600">Error: {error}</div>}
                
            </div>
            {!loading && !error && inventory.length === 0 ? <div className="p-4">Inventory is empty. Add products first.</div> :
            <table className='w-full'>
                <thead className='text-xs text-gray-800 border-b-1 border-b-gray-300 table-header-group'>
                    <tr>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>ID</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Product Name</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Price</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Stock</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Last Update</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map(item => (
                        <tr className='text-gray-800 border-b-1 border-b-gray-300 text-xs font-medium hover:bg-blue-50'>
                            <td className='p-4 text-xs text-blue-400 font-semibold text-left'>{item.id}</td>
                            <td className='p-4 text-xs text-gray-700 text-left flex gap-1 items-center'><span>{item.name}</span></td>
                            <td className='p-4 text-xs text-gray-700 text-left'>{item.price != null ? formatCurrency(item.price) : '-'}</td>
                            <td className='p-4 text-xs text-gray-700 text-left'>{item.stock != 0 ? `${item.stock}` : <span className='text-xs font-bold text-red-600'>OUT OF STOCK</span>}</td>
                            <td className='p-4 text-xs text-gray-700 text-left'>{formatDate(item.updatedAt ?? item.createdAt)}</td>
                            <td className='p-4 whitespace-nowrap'>
                                <IconButton Icon={ContentPasteGo} onClick={() => {
                                    setSelectedItem(item);
                                    setOpenModal(true);
                                    loadStockLogs(item.id);
                                }}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
        </div>
        <Modal open={openModal} onClose={() => {
            setSelectedItem(null);
            setOpenModal(false)
        }}>
            <div>
                <div>
                    <span className="block text-lg font-bold text-gray-700">Manage Inventory</span>
                    <span className="block text-sm font-medium text-gray-500">Update the product's stock and see the update logs below.</span>
                </div>
                <div>
                    <span className='text-sm font-medium text-gray-700'>Selected Item: </span>
                    <span className='text-sm font-semibold text-blue-400'>{selectedItem?.name.toUpperCase() ?? `NO ITEM SELECTED`}</span>
                </div>
                <form action={handleUpdateStock} method='POST'>
                    <InputField name='stock' type='text' placeholder='New Stock' min={0} max={selectedItem?.stock}/>
                    <Button type='submit' name='Save Changes' buttonStyle='mt-4'/>
                </form>
                
                <hr className='mt-4 mb-4 text-gray-400'/>
                <span className='block text-sm font-bold text-gray-700'>Stock Updates</span>
                {loadingLogs && <div className="p-4">Loading stock logs…</div>}
                {errorLogs && <div className="p-4 text-red-600">Error: {errorLogs}</div>}
                {!loadingLogs && !errorLogs && stockLog.length === 0 ? <div className="p-4">No logs yet.</div> :
                <table className='w-full'>
                    <thead className='text-xs text-gray-800 border-b-1 border-b-gray-300 table-header-group'>
                        <tr>
                            <th className='p-4 text-xs font-bold tracking-wide text-left'>Timestamp</th>
                            <th className='p-4 text-xs font-bold tracking-wide text-left'>Product Name</th>
                            <th className='p-4 text-xs font-bold tracking-wide text-left'>Previous Stock</th>
                            <th className='p-4 text-xs font-bold tracking-wide text-left'>New Stock</th>
                            <th className='p-4 text-xs font-bold tracking-wide text-left'>Stocks Changed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockLog.map(log => {
                            const item = inventory.find(i => i.id === log.itemId);
                            return (
                                <tr className='text-gray-800 border-b-1 border-b-gray-300 text-xs font-medium hover:bg-blue-50'>
                                    <td className='p-4 text-xs text-gray-700 text-left'>{formatDate(log.createdAt)}</td>
                                    <td className='p-4 text-xs text-gray-700 text-left flex gap-1 items-center'><img src="" alt="haha" className='border-1 border-gray-500 w-6 h-6 object-cover'/><span>{item?.name ?? '-'}</span></td>
                                    <td className='p-4 text-xs text-gray-700 text-left'>{log.oldStock}</td>
                                    <td className='p-4 text-xs text-gray-700 text-left'>{log.newStock}</td>
                                    <td className='p-4 text-xs text-gray-700 text-left'>{log.newStock - log.oldStock}</td>
                                </tr>
                            )
                            })
                        }
                    </tbody>
                </table>
                }
            </div>
        </Modal>
    </>
  )
}

export default Inventory
