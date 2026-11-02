import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'max-w-lg',
  className = '',
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-200"
      />

      {/* Dialog Window */}
      <div
        className={`
          relative w-full ${maxWidth} bg-surface border border-edge rounded-2xl
          shadow-xl transition-all transform duration-200 z-10 overflow-hidden
          flex flex-col max-h-[90vh] ${className}
        `}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-edge shrink-0">
          <div>
            {title && (
              <h2 className="text-base font-semibold text-txt-main tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xs text-txt-muted mt-1 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 -mr-1.5 text-txt-muted hover:text-txt-main hover:bg-surface-secondary rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm text-txt-main">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-4 bg-surface-secondary/40 border-t border-edge shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
