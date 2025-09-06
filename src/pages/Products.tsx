import Button from '../components/Button'
import { AddOutlined } from '@mui/icons-material'
import IconButton from '../components/IconButton'
import { Delete, Edit} from '@mui/icons-material'
import { useEffect, useState } from 'react';
import { createItem, deleteItem, getItems, updateItem, type Item } from '../api/items_service';
import { formatCurrency, formatDate } from '../utils/format_utils';
import Modal from '../components/Modal';
import InputField from '../components/InputField';

function Products() {
    const [products, setProducts] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        let cancelled = false;

        async function loadProducts(){
            setLoading(true);
            setError(null);

            try{
                const productsData = await getItems();
                if(cancelled) return;
                setProducts(productsData);
            } catch(error){
                console.error(error);
                setError((error as Error)?.message ?? "Unknown error")
            } finally {
                if(!cancelled) setLoading(false);
            }
        }

        loadProducts();
        return () => {cancelled = true;}
    }, []);

    async function handleDeleteItem(itemId: number){
        if(isNaN(itemId) || itemId == null) {
            alert("Invalid item selected.");
            return;
        }
        await deleteItem(itemId);
        setProducts(products.filter(item => item.id !== itemId));
        setOpenDeleteModal(false);
        setSelectedItem(null);
    }

    async function handleEditItem(formData: FormData){
        if(selectedItem == null) {
            alert("No item selected.");
            return;
        }

        const item_id = selectedItem.id;
        const name = String(formData.get("name"));
        const price = Number(formData.get("price"));
        const description = String(formData.get("description"));

        try{
            await updateItem(item_id, name, price, description);
            setOpenEditModal(false);
            window.location.reload();
        } catch(error){
            console.error(error);
            alert(`Failed to update inventory: ${(error as Error).message}`);
            setOpenEditModal(false);
            setSelectedItem(null);
        }
    }
    async function handleCreateItem(formData: FormData){
        const name = String(formData.get("name"));
        const price = Number(formData.get("price"));
        const stock = Number(formData.get("stock"));
        const description = String(formData.get("description"));

        try{
            await createItem(name, price, stock, description);
            setOpenCreateModal(false);
            window.location.reload();
        } catch(error){
            console.error(error);
            alert(`Failed to create product: ${(error as Error).message}`);
        }
    }
  return (
    <>
        <div className='flex justify-between'>
            <span className='text-2xl font-bold text-gray-600'>Products</span>
            <Button name='Create Product' onClick={() => setOpenCreateModal(true)} Icon={AddOutlined}/>
        </div>
        <div className="bg-white rounded-lg min-h-[500px] mt-4">
            <div>
                {loading && <div className="p-4">Loading products…</div>}
                {error && <div className="p-4 text-red-600">Error: {error}</div>}
            </div>
            {!loading && !error && products.length === 0 ? <div className="p-4">You have no products added.</div> :
            <table className='w-full'>
                <thead className='text-xs text-gray-800 border-b-1 border-b-gray-300 table-header-group'>
                    <tr>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>ID</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Product Name</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Price</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Description</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Date Added</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr className='text-gray-800 border-b-1 border-b-gray-300 text-xs font-medium hover:bg-blue-50'>
                            <td className='p-4 text-xs text-blue-400 font-semibold text-left'>{item.id}</td>
                            <td className='p-4 text-xs text-gray-700 text-left flex gap-1 items-center'><span>{item.name}</span></td>
                            <td className='p-4 text-xs text-gray-700 text-left'>{formatCurrency(item.price)}</td>
                            <td className='p-4 text-xs text-gray-700 text-left max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis'>
                                {item.description == "" ? "-" : item.description ?? "-"}
                            </td>
                            <td className='p-4 text-xs text-gray-700 text-left'>{formatDate(item.createdAt)}</td>
                            <td className='p-4 whitespace-nowrap'>
                                <IconButton Icon={Edit} onClick={() => {
                                    setSelectedItem(item);
                                    setOpenEditModal(true)
                                }}/>
                                <IconButton Icon={Delete} onClick={()=>{setSelectedItem(item); setOpenDeleteModal(true);}}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
            <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
                <div>
                    <div>
                        <span className="block text-lg font-bold text-gray-700">
                            New Product
                        </span>
                        <span className="block text-sm font-medium text-gray-500">
                            Fill in the details below to add a new product.
                        </span>
                    </div>
                    <form action={handleCreateItem} className='flex flex-wrap gap-2'>
                        <InputField type='text' name='name' placeholder='Product Name'/>
                        <InputField type='number' name='price' placeholder='Price'/>
                        <InputField type='number' name='stock' placeholder='Initial Stock'/>
                        <InputField type='text' name='description' placeholder='Description' textStyle='w-full'/>
                        <Button type='submit' name='Create Product' buttonStyle='mt-4'/>
                    </form>
                </div>
            </Modal>
            <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
                <div>
                    <div>
                        <span className="block text-lg font-bold text-gray-700">Edit Product</span>
                        <span className="block text-sm font-medium text-gray-500">Update your product details here by changing the value within the fields.</span>
                    </div>
                    <form action={handleEditItem} method='POST' className='flex gap-2 flex-wrap'>
                        <InputField type='text' name='name' placeholder='Product Name' min={8} defaultValue={selectedItem?.name}/>
                        <InputField type='number' name='price' placeholder='Price' min={1} defaultValue={selectedItem?.price}/>
                        <InputField type='text' name='description' placeholder='Description' textStyle='w-full' defaultValue={selectedItem?.description}/>

                        <Button type='submit' name='Save Changes' buttonStyle='mt-4'/>
                    </form>
                </div>
            </Modal>
            <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <div className='text-center flex items-center flex-col justify-center'>
                    <span className="block text-lg font-bold text-red-600">Delete This Product?</span>
                    <span className="block text-sm font-medium text-gray-600">Are you sure you want to delete this product? This action is irreversable and cannot be undone.</span>
                    <div className='flex gap-2 mt-4'>
                        <Button name='Cancel' buttonStyle='bg-gray-400 hover:bg-gray-300' onClick={() => setOpenDeleteModal(false)}/>
                        <Button name='Delete' buttonStyle='bg-red-600 hover:bg-red-500' onClick={() => handleDeleteItem(selectedItem!.id)}/>
                    </div>
                </div>
                
            </Modal>
        </div>
    </>
  )
}

export default Products