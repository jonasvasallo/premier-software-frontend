import type { SvgIconComponent } from '@mui/icons-material'

function IconButton({Icon, onClick} :{Icon:SvgIconComponent, onClick?: () => void}) {
  return (
    <button className='hover:bg-gray-200 rounded-full hover:cursor-pointer' onClick={onClick}>
        <Icon className='text-gray-400 text-2xl'/>
    </button>
  )
}

export default IconButton