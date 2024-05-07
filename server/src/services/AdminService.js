const User = require('../models/User')

const getUsers = async ({
  search = {},
  filter = {},
  sort = {},
  page = 1,
  limit = 1,
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

module.exports = {
  getUsers,
}
