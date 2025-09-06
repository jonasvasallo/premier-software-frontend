import { NavLink } from 'react-router-dom';

import type { SvgIconComponent } from "@mui/icons-material";

type SidebarButtonProps = {
  to: string,
  name: string;
  Icon: SvgIconComponent; // MUI icon type
};

function SidebarButton({ to, name, Icon } : SidebarButtonProps) {
  return (
    <NavLink to={to} className='w-full text-start p-4 hover:bg-blue-50 hover:cursor-pointer flex gap-4 rounded-xl duration-300'>
        <Icon className="text-blue-400"/>
        <span className='font-semibold text-gray-500'>{name}</span>
    </NavLink>
  )
}

export default SidebarButton