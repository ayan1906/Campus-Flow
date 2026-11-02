export function Table({ children, className = '', ...props }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-edge bg-surface shadow-xs">
      <table className={`w-full text-left text-sm border-collapse ${className}`} {...props}>
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ children, className = '', ...props }) {
  return (
    <thead
      className={`bg-surface-secondary/70 border-b border-edge text-xs font-medium text-txt-secondary uppercase tracking-wider select-none ${className}`}
      {...props}
    >
      {children}
    </thead>
  )
}

export function TableBody({ children, className = '', ...props }) {
  return (
    <tbody className={`divide-y divide-edge text-txt-main ${className}`} {...props}>
      {children}
    </tbody>
  )
}

export function TableRow({ children, className = '', hover = true, ...props }) {
  return (
    <tr
      className={`
        transition-colors duration-100
        ${hover ? 'hover:bg-surface-secondary/40' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </tr>
  )
}

export function TableHead({ children, className = '', ...props }) {
  return (
    <th
      className={`px-4 py-3 text-xs font-semibold text-txt-secondary whitespace-nowrap ${className}`}
      {...props}
    >
      {children}
    </th>
  )
}

export function TableCell({ children, className = '', ...props }) {
  return (
    <td
      className={`px-4 py-3 text-sm text-txt-main align-middle whitespace-nowrap ${className}`}
      {...props}
    >
      {children}
    </td>
  )
}

