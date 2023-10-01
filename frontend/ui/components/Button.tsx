import { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  label?: string
  children: React.ReactNode
  className?: string
}

export const Button: React.FC<ButtonProps> = ({ label, children, isLoading, className, ...props }): JSX.Element => {
  return (
    <button
      {...props}
      className={`flex max-h-[54px] items-center justify-center rounded-[10px] bg-gray-200 p-[15px] text-[15px] font-normal transition-all duration-100 hover:bg-[#A9E5BB] ${
        label && 'gap-[10px]'
      } ${isLoading ? 'text-gray-500' : 'text-[#3D293F]'} ${className}`}
    >
      {children}
      {label}
    </button>
  )
}
