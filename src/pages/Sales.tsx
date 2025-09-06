import { AddOutlined, Paid } from "@mui/icons-material"
import Button from "../components/Button"

function Sales() {
  return (
    <>
        <div className='flex justify-between'>
            <span className='text-2xl font-bold text-gray-600'>Sales</span>
            <Button name='Record a Sale' onClick={() => {}} Icon={Paid}/>
        </div>
        <div className="bg-white rounded-lg min-h-[500px] mt-4">
            <table className='w-full'>
                <thead className='text-xs text-gray-800 border-b-1 border-b-gray-300 table-header-group'>
                    <tr>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>ID</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Product Name</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Unit Price</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Units Sold</th>
                        <th className='p-4 text-xs font-bold tracking-wide text-left'>Purchase Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-gray-800 border-b-1 border-b-gray-300 text-xs font-medium hover:bg-blue-50'>
                        <td className='p-4 text-xs text-blue-400 font-semibold text-left'>123</td>
                        <td className='p-4 text-xs text-gray-700 text-left flex gap-1 items-center'><img src="" alt="haha" className='border-1 border-gray-500 w-6 h-6 object-cover'/><span>KAWASAKI NINJA 400</span></td>
                        <td className='p-4 text-xs text-gray-700 text-left'>P123</td>
                        <td className='p-4 text-xs text-gray-700 text-left'>10</td>
                        <td className='p-4 text-xs text-gray-700 text-left'>08/09/2003</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
  )
}

export default Sales