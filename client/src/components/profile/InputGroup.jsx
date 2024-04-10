import Tooltip from './Tooltip'
import { useRef } from 'react'

const InputGroup = ({
  name,
  label,
  type,
  errors,
  required,
  tooltip,
  register,
  setFocus,
  options,
}) => {
  const tooltipRef = useRef(null)

  // Prevent tooltip from opening on label click -> focus input el instead
  const preventTooltipPropagation = e => {
    e.preventDefault()
    if (tooltipRef.current && tooltipRef.current.contains(e.target)) {
      return
    }

    setFocus(name)
  }

  if (type === 'select' && options) {
    return (
      <label
        className="form-control w-full mb-2"
        onClick={preventTooltipPropagation}
      >
        <div className="label">
          <span className="label-text text-[15px] font-semibold">
            {label} <span className="text-red-500">{required ? '*' : ''}</span>
          </span>
          {tooltip && <Tooltip tooltipRef={tooltipRef}>{tooltip}</Tooltip>}
        </div>
        <select
          {...register(name)}
          className={`select select-bordered w-full ${
            errors[name]
              ? 'border-red-500 focus:outline-red-500'
              : 'border-gray-300 focus:outline-primary'
          }`}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors[name] && (
          <div className="label">
            <span className="label-text-alt text-red-500">
              {errors[name].message}
            </span>
          </div>
        )}
      </label>
    )
  }

  if (type === 'textarea') {
    return (
      <label
        className="form-control w-full mb-2"
        onClick={preventTooltipPropagation}
      >
        <div className="label">
          <span className="label-text text-[15px] font-semibold">
            {label} <span className="text-red-500">{required ? '*' : ''}</span>
          </span>
          {tooltip && <Tooltip tooltipRef={tooltipRef}>{tooltip}</Tooltip>}
        </div>
        <textarea
          rows="5"
          {...register(name)}
          className={`textarea textarea-bordered w-full ${
            errors[name]
              ? 'border-red-500 focus:outline-red-500'
              : 'border-gray-300 focus:outline-primary'
          } focus:outline-primary`}
        />

        {errors[name] && (
          <div className="label">
            <span className="label-text-alt text-red-500">
              {errors[name].message}
            </span>
          </div>
        )}
      </label>
    )
  }
  return (
    <label
      className="form-control w-full mb-2"
      onClick={preventTooltipPropagation}
    >
      <div className="label items-center">
        <span className="label-text text-[15px] font-semibold">
          {label} <span className="text-red-500">{required ? '*' : ''}</span>
        </span>
        {tooltip && <Tooltip tooltipRef={tooltipRef}>{tooltip}</Tooltip>}
      </div>
      <input
        type={type}
        {...register(name)}
        // {}
        className={`input input-bordered w-full ${
          errors[name]
            ? 'border-red-500 focus:outline-red-500'
            : 'border-gray-300 focus:outline-primary'
        } focus:outline-primary`}
      />

      {errors[name] && (
        <div className="label">
          <span className="label-text-alt text-red-500">
            {errors[name].message}
          </span>
        </div>
      )}
    </label>
  )
}

export default InputGroup
