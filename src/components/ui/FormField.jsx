function FormField({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  min,
  max,
  rows = 3,
  required = false,
  disabled = false,
  error = '',
  helper = '',
  as = 'input',
  options = [],
}) {
  const inputId = `field-${name}`
  const describedBy = error
    ? `${inputId}-error`
    : helper
      ? `${inputId}-helper`
      : undefined

  const sharedClassName = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
    disabled
      ? 'border-slate-200 bg-slate-100 text-slate-500'
      : error
        ? 'border-rose-300 bg-rose-50 focus:border-rose-400 focus:ring-4 focus:ring-rose-100'
        : 'border-slate-200 bg-white text-slate-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-100'
  }`

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={sharedClassName}
        />
      ) : as === 'select' ? (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={sharedClassName}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={sharedClassName}
        />
      )}

      {helper && !error && (
        <p id={`${inputId}-helper`} className="mt-2 text-xs text-slate-500">
          {helper}
        </p>
      )}

      {error && (
        <p id={`${inputId}-error`} className="mt-2 text-xs font-medium text-rose-700">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
