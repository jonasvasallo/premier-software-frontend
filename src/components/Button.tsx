import type { SvgIconComponent } from '@mui/icons-material'

type ButtonProps = {
    name: string,
    onClick: () => void,
    Icon? : SvgIconComponent
}

function Button({name, onClick, Icon} : ButtonProps) {
  return (
    <button className='bg-blue-400 rounded-md px-4 py-2 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-300 duration-300' onClick={onClick}>
        <div className='w-2 h-2 flex items-center justify-center'>
            {Icon && <Icon className='text-white text-xs'/>}
        </div>
        <span className='text-white font-medium text-sm'>{name}</span>
    </button>
  )
}

export default Button