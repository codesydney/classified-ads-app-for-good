const User = require('../models/User')

const getUsers = async ({
  search = {},
  filter = {},
  sort = {},
  page = 1,
  limit = 10,
}) => {
  // Build the query here
  const searchQuery =
    search?.fieldName && search?.fieldValue
      ? {
          [search.fieldName]: {
            $regex: new RegExp(search.fieldValue, 'i'),
          },
        }
      : {}

  const filterQuery =
    filter?.fieldName && filter?.fieldValue
      ? {
          [filter.fieldName]: filter.fieldValue,
        }
      : {}

  const matchCriteria = { ...searchQuery, ...filterQuery }

  const sortQuery =
    sort.sortBy && sort.sortValue
      ? {
          [sort.sortBy]: sort.sortValue,
        }
      : {}

  const skip = (page - 1) * limit
  limit = parseInt(limit)

  const users = await User.find(matchCriteria)
    .select('-__v -isAutomated -createdAt -updatedAt')
    .sort(sortQuery)
    .skip(skip)
    .limit(limit)

  const total = await User.countDocuments(matchCriteria)
  const totalPages = Math.ceil(total / limit)

  const userArrayNoVirtuals = users.map(user => {
    const userObj = user.toObject()
    delete userObj.fullName
    delete userObj._id
    delete userObj.education.yearGraduatedStr
    return userObj
  })

  return {
    users: userArrayNoVirtuals,
    meta: {
      total,
      page: Number(page),
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  }
}

const flattenObjects = (obj, prefix = '') => {
  const result = {}

  for (const key in obj) {
    const path = prefix ? `${prefix}.${key}` : key

    if (
      typeof obj[key] === 'object' &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      Object.assign(result, flattenObjects(obj[key], path))
    } else {
      result[path] = obj[key]
    }
  }

  return result
}

const processFields = (
  userObj,
  updatedUserObj,
  fieldsToPreserve,
  prefix = '',
) => {
  const fieldsToUnset = {}
  const fieldsToUpdate = { ...updatedUserObj }

  Object.keys(userObj).forEach(key => {
    const path = prefix ? `${prefix}.${key}` : key
    if (!fieldsToPreserve.includes(path)) {
      if (!updatedUserObj.hasOwnProperty(path)) {
        fieldsToUnset[path] = ''
      }
    }
  })

  return [fieldsToUnset, fieldsToUpdate]
}

const updateUser = async (userObj, updatedUserObj, id) => {
  const flattenedUser = flattenObjects(userObj)
  const flattenedUpdatedUser = flattenObjects(updatedUserObj)
  const fieldsToPreserve = ['password', 'isAutomated']
  // Delete fields from userObj that we need persistet / not included in update
  delete flattenedUser.password
  delete flattenedUser.isAutomated
  delete flattenedUser.createdAt
  delete flattenedUser.updatedAt
  delete flattenedUser.__v
  delete flattenedUser._id
  delete flattenedUser.fullName

  delete flattenedUpdatedUser.id

  const [fieldsToUnset, fieldsToUpdate] = processFields(
    flattenedUser,
    flattenedUpdatedUser,
    fieldsToPreserve,
  )

  const updateQuery = {
    $set: fieldsToUpdate,
    $unset: fieldsToUnset,
  }

  const updatedUser = await User.findByIdAndUpdate(id, updateQuery, {
    new: true,
  })

  return updatedUser
}

module.exports = {
  getUsers,
  updateUser,
}
