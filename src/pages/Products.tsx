import Button from '../components/Button'
import { AddOutlined } from '@mui/icons-material'
import IconButton from '../components/IconButton'
import { Delete, Edit} from '@mui/icons-material'

function Products() {
  return (
    <>
        <div className='flex justify-between'>
            <span className='text-2xl font-bold text-gray-600'>Products</span>
            <Button name='Create Product' onClick={() => {}} Icon={AddOutlined}/>
        </div>
        <div className="bg-white rounded-lg min-h-[500px] mt-4">
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
                    <tr className='text-gray-800 border-b-1 border-b-gray-300 text-xs font-medium hover:bg-blue-50'>
                        <td className='p-4 text-xs text-blue-400 font-semibold text-left'>123</td>
                        <td className='p-4 text-xs text-gray-700 text-left flex gap-1 items-center'><img src="" alt="haha" className='border-1 border-gray-500 w-6 h-6 object-cover'/><span>KAWASAKI NINJA 400</span></td>
                        <td className='p-4 text-xs text-gray-700 text-left'>P123</td>
                        <td className='p-4 text-xs text-gray-700 text-left max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur pariatur eveniet molestias in ullam maxime exercitationem velit, at ex tempore laudantium consequatur dignissimos, aut hic. Totam cumque accusamus perspiciatis dignissimos!
                        </td>
                        <td className='p-4 text-xs text-gray-700 text-left'>08/09/2003</td>
                        <td className='p-4 whitespace-nowrap'>
                            <IconButton Icon={Edit}/>
                            <IconButton Icon={Delete}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
  )
}

export default Products