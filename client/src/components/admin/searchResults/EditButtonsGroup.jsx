import EditActiveButton from './EditActiveButton'

const EditActiveButtonsGroup = ({
  handleRevertChanges,
  handleToggleEditView,
  isNew,
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
      {/* DONT RENDER CANCEL BUTTON IF RENDERED IN ADDDOCUMENTMODAL */}
      {!isNew && (
        <EditActiveButton
          handleClick={handleToggleEditView}
          type="button"
          primary={false}
        >
          Cancel
        </EditActiveButton>
      )}
      <EditActiveButton
        // handleClick={() => console.log('updating now')}
        type="submit"
        primary={true}
      >
        {isNew ? 'Add' : 'Update'}
      </EditActiveButton>
    </div>
  )
}

export default EditActiveButtonsGroup
