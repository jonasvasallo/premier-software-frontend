import IconButton from '../components/IconButton'
import { DarkModeOutlined, NotificationsOutlined, SettingsOutlined } from '@mui/icons-material'

function MenuBar() {
  return (
    <div className='h-[80px] p-4 flex items-center justify-between w-full'>
        <div>
          <input type="text" className='bg-white p-2 rounded-md text-sm border-2 border-gray-400' placeholder='Search here...'/>
        </div>
        <div className='flex gap-8'>
          <div className='flex gap-4 items-center'>
            <IconButton Icon={DarkModeOutlined}/>
            <IconButton Icon={NotificationsOutlined}/>
          </div>
          <div className='flex gap-4 items-center'>
            <div className='w-9 h-9 rounded-full bg-gray-500'>
              <img src="/images/grad_pic.jpg" alt="" className='w-9 h-9 rounded-full object-cover object-top'/>
            </div>
            <span className='font-bold text-gray-700'>Jonas V.</span>
            <IconButton Icon={SettingsOutlined}/>
          </div>
        </div>
    </div>
  )
}

export default MenuBar