import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

const VARIANTS = {
  primary:
    'bg-brand text-white hover:bg-brand-hover shadow-xs active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand/40',
  secondary:
    'bg-surface-secondary text-txt-main hover:bg-surface-secondary/80 border border-edge active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-edge',
  outline:
    'bg-transparent text-txt-main border border-edge hover:bg-surface-secondary/60 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand/20',
  ghost:
    'bg-transparent text-txt-secondary hover:text-txt-main hover:bg-surface-secondary/60 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-edge',
  danger:
    'bg-danger-main text-white hover:bg-danger-main/90 shadow-xs active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-danger-main/40',
  'danger-outline':
    'bg-transparent text-danger-main border border-danger-main/30 hover:bg-danger-main/10 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-danger-main/30',
  icon:
    'p-2 text-txt-secondary hover:text-txt-main hover:bg-surface-secondary rounded-lg active:scale-95 focus-visible:ring-2 focus-visible:ring-brand/30',
}

const SIZES = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-9.5 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-base gap-2.5',
  icon: 'h-9 w-9 p-0 justify-center',
  'icon-sm': 'h-8 w-8 p-0 justify-center',
}

export const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isIconOnly = variant === 'icon' || size.startsWith('icon')
    const sizeClasses = isIconOnly ? SIZES[size] || SIZES.icon : SIZES[size] || SIZES.md
    const variantClasses = VARIANTS[variant] || VARIANTS.primary

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center font-medium rounded-lg
          transition-all duration-150 select-none cursor-pointer
          focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
          ${sizeClasses}
          ${variantClasses}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
            {!isIconOnly && <span>Loading...</span>}
          </>
        ) : (
          <>
            {LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" />}
            {children}
            {RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

