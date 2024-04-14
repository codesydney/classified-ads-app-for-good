const FormButton = ({ children, isDirty, isLoading }) => {
  return (
    <button
      disabled={!isDirty || isLoading}
      className="w-full py-2 bg-primary bg-transparent hover:bg-primary text-primary hover:font-semibold hover:text-white mt-[15px] rounded-md border-2 border-primary ease-in-out duration-300"
      type="submit"
    >
      {isLoading ? <span className="loading loading-spinner"></span> : children}
    </button>
  )
}

export default FormButton
