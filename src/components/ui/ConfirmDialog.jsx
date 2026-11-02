import { AlertTriangle, Info } from 'lucide-react'
import { Modal } from './Modal'
import { Button } from './Button'

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone. Please confirm to proceed.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) {
  const isDanger = variant === 'danger'

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-md"
      footer={
        <>
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={isDanger ? 'danger' : 'primary'}
            size="md"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-3.5">
        <div
          className={`
            p-2.5 rounded-xl shrink-0
            ${isDanger ? 'bg-danger-main/10 text-danger-main' : 'bg-brand/10 text-brand'}
          `}
        >
          {isDanger ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <Info className="w-5 h-5" />
          )}
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-txt-main">{title}</h4>
          <p className="text-xs text-txt-muted leading-relaxed">{message}</p>
        </div>
      </div>
    </Modal>
  )
}
