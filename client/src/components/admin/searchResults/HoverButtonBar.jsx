import { FaCaretRight, FaCaretDown, FaTrashAlt } from 'react-icons/fa'
import { MdModeEditOutline } from 'react-icons/md'
import IconButton from './IconButton'
const HoverButtonBar = ({
  isHovered,
  setIsExpanded,
  isExpanded,
  handleToggleEditView,
  isNew,
  handleDeleteUser,
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
      {/* DONT RENDER EDIT AND DELETE BUTTONS WHEN RENDERED IN ADDDOCUMENTMODAL */}
      {!isNew && (
        <div className="ml-auto flex gap-2">
          <IconButton handleClick={handleToggleEditView}>
            <MdModeEditOutline />
          </IconButton>
          <IconButton handleClick={handleDeleteUser}>
            <FaTrashAlt />
          </IconButton>
        </div>
      )}
    </div>
  )
}

export default HoverButtonBar
