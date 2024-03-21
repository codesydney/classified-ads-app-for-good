import noResultsSVG from '../../assets/noSearchResultsSvg.svg'

const NoResults = () => {
  return (
    <div className="flex flex-col items-center gap-1 mb-10">
      <img
        width="300px"
        src={noResultsSVG}
        alt=""
        aria-hidden="true"
        className="mb-4"
      />
      <h1 className="text-primary/80 text-4xl font-bold mb-4 text-center">
        No Results Found
      </h1>
      <p className="">We couldn't find any results for ... .</p>
      <p className="font-semibold">Try searching again!</p>
    </div>
  )
}

export default NoResults
