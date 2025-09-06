import type {  SvgIconComponent } from '@mui/icons-material'

type IconButtonProps = {
    type?: "button" | "submit" | "reset",
    onClick?: () => void,
    Icon : SvgIconComponent,
    buttonStyle?: string,
}

function IconButton({Icon, onClick, buttonStyle, type} : IconButtonProps) {
  return (
    <button type={type} className={`hover:bg-gray-200 rounded-full hover:cursor-pointer ${buttonStyle}`} onClick={onClick}>
        <Icon className='text-gray-400 text-2xl'/>
    </button>
  )
}

export default IconButton