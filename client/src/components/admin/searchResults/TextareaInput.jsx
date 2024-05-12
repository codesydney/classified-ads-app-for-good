import { useEffect, useRef, useState } from 'react'
import './resizer.css'
const TextareaInput = ({
  value,
  textareaMaxWidth,
  field,
  handleFieldEdit,
  isID,
}) => {
  const [textareaWidth, setTextareaWidth] = useState(null)
  const stringLengthRef = useRef(null)

  useEffect(() => {
    if (stringLengthRef.current) {
      const textareaCurrentWidth = stringLengthRef.current.offsetWidth
      setTextareaWidth(textareaCurrentWidth)
    }
  }, [stringLengthRef.current, value])

  return (
    <div className="flex text-green-700">
      <span
        aria-hidden="true"
        ref={stringLengthRef}
        className="text-xs absolute z-[-10] opacity-0"
      >
        {value}
      </span>
      {isID ? (
        <span className="text-red-700">ObjectId ( '{value}' )</span>
      ) : (
        <>
          "
          <textarea
            className=" my-[1px] block text-xs min-w-[10px] px-[2px] resize bg-transparent rounded focus:outline-[0px] focus:border-r-[2px] focus:border-l-[2px] border-primary text-green-700"
            style={{
              width: `${textareaWidth + 24}px`,
              maxWidth: `${textareaMaxWidth - 24}px`,
            }}
            // {...register(field)}
            name={field}
            value={value}
            onChange={handleFieldEdit}
            rows="1"
          />
          "
        </>
      )}
    </div>
  )
}

export default TextareaInput
