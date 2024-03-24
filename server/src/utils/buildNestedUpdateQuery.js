// Build query for service and education nested objs
const buildNestedQuery = (sectionName, updateObject) => {
  const updateQueryObj = {}
  for (const [field, value] of Object.entries(updateObject)) {
    updateQueryObj[`${sectionName}.${field}`] = value
  }
  return updateQueryObj
}

module.exports = buildNestedQuery
