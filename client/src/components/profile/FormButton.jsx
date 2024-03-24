const FormButton = ({ children }) => {
  return (
    <button
      className="btn btn-squre w-fit py-2 bg-primary hover:bg-primary text-white mt-[15px]"
      type="submit"
    >
      {/* {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            'Login'
          )} */}
      {children}
    </button>
  )
}

export default FormButton
