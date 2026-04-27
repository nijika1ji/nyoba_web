import Button from './Button'

function StateCard({
  title,
  message,
  variant = 'info',
  action,
  className = '',
}) {
  const variantStyles = {
    info: 'border-slate-200 bg-white text-slate-700',
    empty: 'border-dashed border-slate-300 bg-white text-slate-600',
    error: 'border-rose-200 bg-rose-50 text-rose-800',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  }

  return (
    <div className={`rounded-3xl border p-8 shadow-sm ${variantStyles[variant]} ${className}`}>
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      {message && <p className="mt-3 text-sm leading-7">{message}</p>}

      {action && (
        <div className="mt-5">
          <Button
            to={action.to}
            onClick={action.onClick}
            variant={action.variant || 'outline'}
            size={action.size || 'md'}
          >
            {action.label}
          </Button>
        </div>
      )}
    </div>
  )
}

export default StateCard
