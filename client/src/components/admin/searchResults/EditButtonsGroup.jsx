import EditActiveButton from './EditActiveButton'

const EditActiveButtonsGroup = ({
  handleRevertChanges,
  handleToggleEditView,
}) => {
  return (
    <div className="flex justify-end gap-2 p-4 bg-gray-200/50 mt-4">
      <div className="mr-auto">
        <EditActiveButton
          handleClick={handleRevertChanges}
          type="button"
          primary={false}
        >
          Revert
        </EditActiveButton>
      </div>
      <EditActiveButton
        handleClick={handleToggleEditView}
        type="button"
        primary={false}
      >
        Cancel
      </EditActiveButton>
      <EditActiveButton
        handleClick={() => console.log('updating now')}
        type="button"
        primary={true}
      >
        Update
      </EditActiveButton>
    </div>
  )
}

export default EditActiveButtonsGroup
