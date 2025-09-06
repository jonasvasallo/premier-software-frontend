import Modal from '../components/Modal'
import IconButton from '../components/IconButton'
import { ContentPasteGo } from '@mui/icons-material'
import { useState } from 'react';

function Inventory() {
    const [openModal, setOpenModal] = useState(false);
  return (
    <>
        <span className='text-2xl font-bold text-gray-600'>Inventory</span>
        <div className="bg-white rounded-lg min-h-[500px] mt-4">
            <table className='w-full'>
                <thead className='text-xs text-gray-800 border-b-1 border-b-gray-300 table-header-group'>
                    <tr>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>ID</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Product Name</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Price</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Stock</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Category</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Date Updated</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-gray-800 border-b-1 border-b-gray-300 text-xs font-medium hover:bg-blue-50'>
                        <td className='p-4 text-xs text-blue-400 font-semibold text-left'>123</td>
                        <td className='p-4 text-xs text-gray-700 text-left flex gap-1 items-center'><img src="" alt="haha" className='border-1 border-gray-500 w-6 h-6 object-cover'/><span>KAWASAKI NINJA 400</span></td>
                        <td className='p-4 text-xs text-gray-700 text-left'>P123</td>
                        <td className='p-4 text-xs text-gray-700 text-left'>69</td>
                        <td className='p-4 text-xs text-gray-700 text-left'>Shoes</td>
                        <td className='p-4 text-xs text-gray-700 text-left'>08/09/2003</td>
                        <td className='p-4 whitespace-nowrap'>
                            <IconButton Icon={ContentPasteGo} onClick={() => setOpenModal(true)}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <span>hehehe</span>
        </Modal>
    </>
  )
}

export default Inventory
