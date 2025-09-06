import React from 'react'

type InputFieldProps = {
    placeholder?: string,
    type: string,
    name?: string,
    value?: string,
    max?: number,
    min?: number,
    step?: number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    textStyle?: string,
    defaultValue?: string | number,
}

function InputField({name, placeholder, type, value, onChange, textStyle, max, min, step, defaultValue}: InputFieldProps) {
  return (
    <input 
        name={name}
        type={type} 
        className={`bg-white p-2 rounded-md text-sm border-2 border-gray-400 ${textStyle}`} 
        placeholder={placeholder ?? ''} 
        value={value} 
        max={max}
        min={min}
        step={step}
        onChange={onChange}
        defaultValue={defaultValue}
    />
  )
}

export default InputField