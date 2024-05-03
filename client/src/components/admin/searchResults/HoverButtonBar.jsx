import { FaCaretRight, FaCaretDown, FaTrashAlt } from 'react-icons/fa'
import { MdModeEditOutline } from 'react-icons/md'
import IconButton from './IconButton'
const HoverButtonBar = ({
  isHovered,
  setIsExpanded,
  isExpanded,
  handleToggleEditView,
}) => {
  return (
    <div
      className={`w-full px-4 flex gap-2 absolute left-0 top-4
          ${isHovered ? 'md:absolute' : 'md:hidden'}
        `}
    >
      <IconButton handleClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <FaCaretDown /> : <FaCaretRight />}
      </IconButton>
      <div className="ml-auto flex gap-2">
        <IconButton handleClick={handleToggleEditView}>
          <MdModeEditOutline />
        </IconButton>
        <IconButton handleClick={() => console.log('I will delete mysefl')}>
          <FaTrashAlt />
        </IconButton>
      </div>
    </div>
  )
}

export default HoverButtonBar
