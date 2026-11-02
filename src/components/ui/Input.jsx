import { forwardRef } from 'react'

export const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      rightAction,
      className = '',
      id,
      name,
      type = 'text',
      disabled = false,
      required = false,
      ...props
    },
    ref
  ) => {
    const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={inputId}
              className="block text-xs font-medium text-txt-secondary tracking-wide select-none"
            >
              {label}
              {required && <span className="text-danger-main ml-0.5">*</span>}
            </label>
          </div>
        )}

        <div className="relative flex items-center">
          {LeftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-txt-muted">
              <LeftIcon className="w-4 h-4" />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            disabled={disabled}
            className={`
              w-full h-9.5 px-3 rounded-lg text-sm bg-surface text-txt-main
              border transition-all duration-150 placeholder:text-txt-muted
              disabled:opacity-50 disabled:bg-surface-secondary disabled:cursor-not-allowed
              ${LeftIcon ? 'pl-9' : 'pl-3'}
              ${RightIcon || rightAction ? 'pr-9' : 'pr-3'}
              ${
                error
                  ? 'border-danger-main focus:border-danger-main focus:ring-2 focus:ring-danger-main/20'
                  : 'border-edge hover:border-txt-muted/40 focus:border-brand focus:ring-2 focus:ring-brand/20'
              }
              focus:outline-none
              ${className}
            `}
            {...props}
          />

          {RightIcon && !rightAction && (
            <div className="absolute right-3 flex items-center pointer-events-none text-txt-muted">
              <RightIcon className="w-4 h-4" />
            </div>
          )}

          {rightAction && (
            <div className="absolute right-2 flex items-center">
              {rightAction}
            </div>
          )}
        </div>

        {error && (
          <p className="text-xs text-danger-main flex items-center gap-1 font-medium animate-in fade-in duration-150">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p className="text-xs text-txt-muted">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
