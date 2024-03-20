import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import NavigationButton from './NavigationButton'

const PaginationNavigation = ({ meta, onPageChange }) => {
  // Variables that determine the type of navigation
  const isFirstTwoPages = () => meta.page < 3
  const isThirdPage = () => meta.page === 3
  const isLastTwoPages = () => meta.totalPages - meta.page < 2
  const isThirdLastPage = () => meta.totalPages - meta.page === 2

  // Helper function to create page number buttons
  const renderPageButton = (pageNumber, isActive) => {
    return (
      <NavigationButton
        key={pageNumber}
        isActive={isActive}
        handleClick={() => onPageChange(pageNumber)}
      >
        {pageNumber}
      </NavigationButton>
    )
  }

  // Helper function to render ellipsis
  const renderEllipsis = key => {
    return (
      <div key={key} className="mx-2">
        ...
      </div>
    )
  }

  // Functions to render different types of pagination ui.

  // ie 1, 2, 3, 4
  const renderAllPages = () => {
    const pageButtons = []
    for (let i = 1; i <= meta.totalPages; i++) {
      pageButtons.push(renderPageButton(i, i === meta.page))
    }
    return pageButtons
  }

  // ie 1, 2 (active), 3 ... last
  // 1, 2, 3(active), 4, ...last
  //1 ... pages - 2, pages - 1, last page
  // 1 ... pages - 3, pages - 2 (current), pages - 1, last page
  const renderEdgePages = (startPage, endPage) => {
    const pageButtons = []
    if (startPage === 1) {
      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(renderPageButton(i, i === meta.page))
      }
      pageButtons.push(renderEllipsis('el'))
      pageButtons.push(renderPageButton(meta.totalPages, false))
    } else {
      pageButtons.push(renderPageButton(1, false))
      pageButtons.push(renderEllipsis('el'))
      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(renderPageButton(i, i === meta.page))
      }
    }
    return pageButtons
  }

  // ie first page ... current - 1, currentpage, current + 1, ... last
  const renderCenterPages = () => {
    return [
      renderPageButton(1, false),
      renderEllipsis('el1'),
      renderPageButton(meta.page - 1, false),
      renderPageButton(meta.page, true),
      renderPageButton(meta.page + 1, false),
      renderEllipsis('el2'),
      renderPageButton(meta.totalPages, false),
    ]
  }

  // determine which navigation to render
  const buildConditionalNav = () => {
    if (meta.totalPages < 6) {
      return renderAllPages()
    }
    if (isFirstTwoPages()) {
      return renderEdgePages(1, 3)
    } else if (isThirdPage()) {
      return renderEdgePages(1, 4)
    } else if (isLastTwoPages()) {
      return renderEdgePages(meta.totalPages - 2, meta.totalPages)
    } else if (isThirdLastPage()) {
      return renderEdgePages(meta.totalPages - 3, meta.totalPages)
    } else {
      return renderCenterPages()
    }
  }

  return (
    <div className="flex justify-center items-center p-8">
      {meta.hasPrevPage && (
        <NavigationButton
          isActive={false}
          handleClick={() => onPageChange(meta.page - 1)}
        >
          <MdNavigateBefore className="w-6 h-6" />
        </NavigationButton>
      )}
      {buildConditionalNav()}
      {meta.hasNextPage && (
        <NavigationButton
          isActive={false}
          handleClick={() => onPageChange(meta.page + 1)}
        >
          <MdNavigateNext className="w-6 h-6" />
        </NavigationButton>
      )}
    </div>
  )
}

export default PaginationNavigation
