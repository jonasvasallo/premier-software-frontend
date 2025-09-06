import type { SvgIconComponent } from '@mui/icons-material'

type ButtonProps = {
    name: string,
    type?: "button" | "submit" | "reset",
    onClick?: () => void,
    Icon? : SvgIconComponent,
    buttonStyle?: string,
}

function Button({name, type, onClick, Icon, buttonStyle} : ButtonProps) {
  return (
    <button 
      className={`bg-blue-400 rounded-md px-4 py-2 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-300 duration-300 ${buttonStyle}`} 
      type={type ?? "button"}
      onClick={onClick}>
        {Icon &&
        <div className='w-2 h-2 flex items-center justify-center'>
            <Icon className='text-white text-xs'/>
        </div>
        }
        <span className='text-white font-medium text-sm'>{name}</span>
    </button>
  )
}

export default Button