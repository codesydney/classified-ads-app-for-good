const UserSkeleton = ({}) => {
  return (
    <div className="self-stretch justify-center flex flex-col max-w-[450px]   shadow-lg">
      <div
        className="w-full animate-pulse bg-neutral/20"
        style={{ aspectRatio: 4 / 3 }}
      ></div>

      <div className="p-2 px-4 flex flex-col flex-grow">
        <div className="h-8 my-2 w-full bg-neutral animate-pulse bg-neutral/20"></div>

        <div className="h-6 w-1/3 mb-6 animate-pulse bg-neutral/20"></div>
        <div className="mb-6">
          <div className="h-4 w-full mb-2 animate-pulse bg-neutral/20"></div>
          <div className="h-4 w-full mb-2 animate-pulse bg-neutral/20"></div>
          <div className="h-4 w-full mb-2 animate-pulse bg-neutral/20"></div>
          <div className="h-4 w-full mb-2 animate-pulse bg-neutral/20"></div>
        </div>
        <div className="mt-auto flex gap-4 justify-between">
          <div className="h-10 w-full animate-pulse bg-neutral/20"></div>
          <div className="h-10 w-full animate-pulse bg-neutral/20"></div>
        </div>
      </div>
    </div>
  )
}

export default UserSkeleton
