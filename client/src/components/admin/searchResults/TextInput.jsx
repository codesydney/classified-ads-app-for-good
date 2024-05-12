import { useEffect, useRef, useState } from 'react'

const TextInput = ({ value, textareaMaxWidth, field, handleFieldEdit }) => {
  const [textareaWidth, setTextareaWidth] = useState(null)
  const stringLengthRef = useRef(null)

  useEffect(() => {
    if (stringLengthRef.current) {
      const textareaCurrentWidth = stringLengthRef.current.offsetWidth
      setTextareaWidth(textareaCurrentWidth)
    }
  }, [stringLengthRef.current, value])

  return (
    <>
      <span
        aria-hidden="true"
        ref={stringLengthRef}
        className="text-xs absolute z-[-10] opacity-0"
      >
        {value}
      </span>
      <input
        className=" my-[1px] block text-xs min-w-[10px] px-[2px] focus:outline-primary outline-none bg-transparent rounded"
        style={{
          width: `${textareaWidth + 4}px`,
          // maxWidth: `${textareaMaxWidth - 24}px`,
        }}
        // {...register(field)}
        name={field}
        value={value}
        onChange={handleFieldEdit}
        rows="1"
      />
    </>
  )
}

export default TextInput
