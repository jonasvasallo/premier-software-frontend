import { useEffect, useState } from "react";
import { getAllStockLogs, type StockLog } from "../api/stock_logs_service";
import { getSales, type Sale } from "../api/sales_service";
import { fetchNoStockItems, getItems, type Item } from "../api/items_service";
import { formatCurrency, formatDate } from "../utils/format_utils";

function Dashboard() {

    const [items, setItems] = useState<Item[]>([]);
    const [stockLog, setStockLog] = useState<StockLog[]>([]);
    const [outOfStockProducts, setOutOfStockProducts] = useState<Item[]>([]);
    const [recentSales, setRecentSales] = useState<Sale[]>([]);

    const [loadingItems, setLoadingItems] = useState(false);
    const [loadingStockLog, setLoadingStockLog] = useState(false);
    const [loadingOutOfStock, setLoadingOutOfStock] = useState(false);
    const [loadingRecentSales, setLoadingRecentSales] = useState(false);

    const [errorItems, setErrorItems] = useState<string | null>(null);
    const [errorStockLog, setErrorStockLog] = useState<string | null>(null);
    const [errorOutOfStock, setErrorOutOfStock] = useState<string | null>(null);
    const [errorRecentSales, setErrorRecentSales] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadListOfItems(){
            setLoadingStockLog(true);
            setErrorStockLog(null);

            try{
                const itemsData = await getItems();
                if(cancelled) return;
                setItems(itemsData);
            } catch(error){
                console.error(error);
                setErrorItems((error as Error)?.message ?? "Unknown error");
            } finally {
                if(!cancelled){
                    setLoadingItems(false);
                }
            }
        }

        async function loadStockUpdates(){
            setLoadingStockLog(true);
            setErrorStockLog(null);

            try{
                const stockLogData = await getAllStockLogs();
                if(cancelled) return;
                setStockLog(stockLogData);
            } catch(error){
                console.error(error);
                setErrorStockLog((error as Error)?.message ?? "Unknown error");
            } finally {
                if(!cancelled){
                    setLoadingStockLog(false);
                }
            }

        }
        
        async function loadOutOfStockProducts(){
            setLoadingOutOfStock(true);
            setErrorOutOfStock(null);

            try{
                const outOfStockData = await fetchNoStockItems();
                if(cancelled) return;
                setOutOfStockProducts(outOfStockData);
            } catch(error){
                console.error(error);
                setErrorOutOfStock((error as Error)?.message ?? "Unknown error");
            } finally {
                if(!cancelled){
                    setLoadingOutOfStock(false);
                }
            }
        }

        async function loadRecentSales(){
            setLoadingRecentSales(true);
            setErrorRecentSales(null);

            try{
                const recentSalesData = await getSales();
                if(cancelled) return;
                setRecentSales(recentSalesData);
            } catch(error){
                console.error(error);
                setErrorRecentSales((error as Error)?.message ?? "Unknown error");
            } finally {
                if(!cancelled){
                    setLoadingRecentSales(false);
                }
            }
        }

        loadListOfItems();
        loadStockUpdates();
        loadOutOfStockProducts();
        loadRecentSales();

        return () => { cancelled = true; }
    }, []);
  return (
    <>
        <div>
            <span className='text-xl font-bold text-gray-600'>Hi, welcome back!</span>
            <span className='ml-8 text-sm font-medium text-gray-400'>Your information dashboard</span>
        </div>
        <div className="flex gap-4">
            <div className="bg-white rounded-lg min-h-[300px] mt-4 w-full max-h-[200px]">
                <div className="p-4">
                    <span className="text-md font-bold text-gray-700">
                        Stock Updates
                    </span>
                </div>
                <div className="overflow-y-auto">
                    {loadingStockLog && <div className="p-4">Loading stock updates…</div>}
                    {errorStockLog && <div className="p-4 text-red-600">Error: {errorStockLog}</div>}
                    {!loadingStockLog && !errorStockLog && stockLog.length === 0 ? <div className="p-4">No stock updates found.</div> :
                    <div className="overflow-y-auto h-[230px]">
                        <table className="table-auto">
                            <thead className="text-xs text-gray-800 border-b-1 border-b-gray-300">
                            <tr>
                                <th className="p-4 text-left">Timestamp</th>
                                <th className="p-4 text-left">Product</th>
                                <th className="p-4 text-left">Previous Stock</th>
                                <th className="p-4 text-left">New Stock</th>
                            </tr>
                            </thead>
                            <tbody>
                            {stockLog.map((log) => {
                                const item = items.find(item => item.id === log.itemId);

                                return <tr key={log.createdAt.toString()} className="text-xs text-gray-700 border-b hover:bg-blue-50">
                                <td className="p-4 break-words">{formatDate(log.createdAt)}</td>
                                <td className="p-4 break-words">{item?.name ?? `-`}</td>
                                <td className="p-4 break-words">{log.oldStock}</td>
                                <td className="p-4 break-words">{log.newStock}</td>
                                </tr>
                            }
                                
                            )}
                            </tbody>
                        </table>
                    </div>
                    }
                </div>
            </div>
            <div className="bg-white rounded-lg min-h-[300px] mt-4 w-full">
                <div className="p-4">
                    <span className="text-md font-bold text-gray-700">
                        Out of Stock Products
                    </span>
                </div>
                <div className="overflow-y-auto">
                    {loadingOutOfStock && <div className="p-4">Loading out of stock products…</div>}
                    {errorOutOfStock && <div className="p-4 text-red-600">Error: {errorOutOfStock}</div>}
                    {!loadingOutOfStock && !errorOutOfStock && outOfStockProducts.length === 0 ? <div className="p-4">No stock updates found.</div> :
                    <div className="overflow-y-auto h-[230px]">
                        <table className="w-full table-auto">
                            <thead className="text-xs text-gray-800 border-b-1 border-b-gray-300">
                            <tr>
                                <th className="p-4 text-left">Product</th>
                                <th className="p-4 text-left">Stock</th>
                            </tr>
                            </thead>
                            <tbody>
                            {outOfStockProducts.map((product) => (
                                <tr key={product.createdAt.toString()} className="text-xs text-gray-700 border-b hover:bg-blue-50">
                                <td className="p-4 break-words">{product.name}</td>
                                <td className="p-4 break-words text-red-600 font-bold text-xs">OUT OF STOCK</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    }
                </div>
            </div>
        </div>
        <div className="bg-white p-4 rounded-lg min-h-[300px] mt-4 w-full">
            <div className="p-4">
                <span className="text-md font-bold text-gray-700">
                    Recent Sales
                </span>
            </div>
            <div className="overflow-y-auto">
                {loadingRecentSales && <div className="p-4">Loading recent sales…</div>}
                {errorRecentSales && <div className="p-4 text-red-600">Error: {errorRecentSales}</div>}
                {!loadingRecentSales && !errorRecentSales && recentSales.length === 0 ? <div className="p-4">No sales yet.</div> :
                <div className="overflow-y-auto h-[230px]">
                    <table className="w-full table-auto">
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
                        {recentSales.map((sale) => {
                            const item = items[sale.itemId];
                            const unitPrice = item?.price ?? "-";
        
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
                                {typeof unitPrice === "number" && !isNaN(item?.price) ? formatCurrency(unitPrice) : `-`}
                                </td>
        
                                <td className="p-4 text-xs text-gray-700 text-left">{sale.unitsSold}</td>
        
                                <td className="p-4 text-xs text-gray-700 text-left">{typeof unitPrice === "number" && !isNaN(item?.price) ? formatCurrency(unitPrice) : `-`}</td>
        
                                <td className="p-4 text-xs text-gray-700 text-left">{formatDate(sale.purchaseDate)}</td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                }
            </div>
        </div>
    </>
  )
}

export default Dashboard