import SidebarButton from '../components/SidebarButton'

import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import InventoryIcon from '@mui/icons-material/Inventory2Outlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import { PointOfSaleOutlined } from '@mui/icons-material';

function Sidebar() {
  return (
    <div className='bg-white w-[30%] p-4 shadow-[10px_0_55px_0_rgba(0,0,0,0.05)]'>
        <div className='h-[80px] flex items-center gap-2'>
            <div className='w-[50px] h-[50px] bg-blue-400 rounded-full flex justify-center items-center'>
              <InventoryIcon className='text-white'/>
            </div>
            <div className="flex flex-col">
              <span className='text-lg font-bold text-gray-500'>Inventory App</span>
              <span className='text-xs font-medium text-blue-400'>Premier Software Enterprises</span>
            </div>
        </div>
        <br />
        <div className='flex flex-col gap-1'>
          <SidebarButton to="/" name='Dashboard' Icon={SpaceDashboardOutlinedIcon}/>
          <SidebarButton to="/products" name='Products' Icon={InventoryIcon}/>
          <SidebarButton to="/inventory" name='Inventory' Icon={ContentPasteOutlinedIcon}/>
          <SidebarButton to="/sales" name='Sales' Icon={PointOfSaleOutlined}/>
        </div>
    </div>
  )
}

export default Sidebar