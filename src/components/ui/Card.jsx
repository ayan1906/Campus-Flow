import { forwardRef } from 'react'

export const Card = forwardRef(
  ({ children, className = '', hoverable = false, padding = 'md', ...props }, ref) => {
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-5',
      lg: 'p-6',
    }[padding] || 'p-5'

    return (
      <div
        ref={ref}
        className={`
          bg-surface text-txt-main rounded-xl border border-edge shadow-xs
          ${hoverable ? 'hover:border-txt-muted/30 hover:shadow-sm transition-all duration-150 cursor-pointer' : ''}
          ${paddingStyles}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`flex flex-col space-y-1.5 pb-4 ${className}`} {...props}>
    {children}
  </div>
)

export const CardTitle = ({ children, className = '', ...props }) => (
  <h3
    className={`text-base font-semibold text-txt-main tracking-tight leading-none ${className}`}
    {...props}
  >
    {children}
  </h3>
)

export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-xs text-txt-muted leading-relaxed ${className}`} {...props}>
    {children}
  </p>
)

export const CardContent = ({ children, className = '', ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
)

export const CardFooter = ({ children, className = '', ...props }) => (
  <div
    className={`flex items-center pt-4 border-t border-edge ${className}`}
    {...props}
  >
    {children}
  </div>
)

