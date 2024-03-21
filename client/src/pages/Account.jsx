import { useSelector } from 'react-redux'

const Account = () => {
  const { currentUser } = useSelector(state => state.auth)

  return (
    <div className="mt-[30px]">
      <pre>{JSON.stringify(currentUser, null, 4)}</pre>
    </div>
  )
}

export default Account
