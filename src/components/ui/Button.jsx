import { Link } from 'react-router-dom'

function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  to,
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

  const variantStyles = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
    secondary:
      'bg-slate-100 text-slate-800 hover:bg-slate-200 focus-visible:ring-slate-400',
    outline:
      'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400',
    action:
      'bg-amber-400 text-black shadow-[0_4px_0_0_#92400e] hover:translate-y-[1px] hover:shadow-[0_3px_0_0_#92400e] focus-visible:ring-amber-500',
    ghost:
      'text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs rounded-lg',
    md: 'px-5 py-3 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-xl',
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={combinedClassName} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
