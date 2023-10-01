import { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  label?: string
  children: React.ReactNode
  className?: string
}

export const SecondaryButton: React.FC<ButtonProps> = ({
  label,
  children,
  isLoading,
  className,
  ...props
}): JSX.Element => {
  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-[10px] bg-transparent text-[18px] font-normal text-[#FCF6B1] ${className}`}
    >
      {children}
      {label}
    </button>
  )
}
