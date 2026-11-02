import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

export const Select = forwardRef(
  (
    {
      label,
      options = [],
      placeholder = 'Select an option',
      error,
      helperText,
      leftIcon: LeftIcon,
      className = '',
      id,
      name,
      disabled = false,
      required = false,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id || name || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-medium text-txt-secondary tracking-wide select-none"
          >
            {label}
            {required && <span className="text-danger-main ml-0.5">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {LeftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-txt-muted">
              <LeftIcon className="w-4 h-4" />
            </div>
          )}

          <select
            ref={ref}
            id={selectId}
            name={name}
            disabled={disabled}
            className={`
              w-full h-9.5 px-3 rounded-lg text-sm bg-surface text-txt-main
              border transition-all duration-150 appearance-none cursor-pointer
              disabled:opacity-50 disabled:bg-surface-secondary disabled:cursor-not-allowed
              ${LeftIcon ? 'pl-9' : 'pl-3'}
              pr-9
              ${
                error
                  ? 'border-danger-main focus:border-danger-main focus:ring-2 focus:ring-danger-main/20'
                  : 'border-edge hover:border-txt-muted/40 focus:border-brand focus:ring-2 focus:ring-brand/20'
              }
              focus:outline-none
              ${className}
            `}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="text-txt-muted">
                {placeholder}
              </option>
            )}
            {children ||
              options.map((opt) => {
                const isObj = typeof opt === 'object' && opt !== null
                const value = isObj ? opt.value : opt
                const labelText = isObj ? opt.label : opt
                return (
                  <option key={value} value={value} className="bg-surface text-txt-main">
                    {labelText}
                  </option>
                )
              })}
          </select>

          <div className="absolute right-3 flex items-center pointer-events-none text-txt-muted">
            <ChevronDown className="w-4 h-4" />
          </div>
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

Select.displayName = 'Select'

