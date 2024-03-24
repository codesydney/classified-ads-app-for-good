const formatDirtyFields = (dirtyFields, formState) => {
  const dirtyFieldsObj = Object.keys(dirtyFields).reduce((acc, field) => {
    acc[field] = formState[field]
    return acc
  }, {})
  return dirtyFieldsObj
}

export default formatDirtyFields
