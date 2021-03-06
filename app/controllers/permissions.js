const winston = require('winston')
const services = require('../services')

/*
* Validates parameters for get "/api/permissions" api
* @param {Object} user - Mongo user object
* @returns {[(string|Array)]} - List of errors or undefined if there are no errors
*/
const getRequestValidator = (user) => {
  let errors = []

  if (!user) {
    errors.push('No user was provided')
  }

  if (errors.length !== 0) {
    return errors
  }
}

/*
* Validates parameters for get "/api/permissions/:permissionId" api
* @param {Object} user - Mongo user object
* @param {string} permissionId - _id for permission object
* @returns {[(string|Array)]} - List of errors or undefined if there are no errors
*/
const getByIdRequestValidator = (user, permissionId) => {
  let errors = []

  if (!user) {
    errors.push('No user was provided')
  }

  if (!permissionId) {
    errors.push('No permissionId was provided')
  }

  if (errors.length !== 0) {
    return errors
  }
}

/*
* Validates parameters for post "/api/permissions" api
* @param {Object} user - Mongo user object
* @param {string} userId - _id for user object to assign permission to
* @param {string} documentId - _id for document object
* @param {string} permissionsType - _id for permission object
* @returns {[(string|Array)]} - List of errors or undefined if there are no errors
*/
const postRequestValidator = (user, userId, documentId, permissionsType) => {
  let errors = []

  if (!user) {
    errors.push('No user was provided')
  }

  if (!userId) {
    errors.push('No userId was provided')
  }

  if (!documentId) {
    errors.push('No documentId was provided')
  }

  if (!permissionsType) {
    errors.push('No permissionsType was provided')
  }

  if (errors.length !== 0) {
    return errors
  }
}

/*
* Validates parameters for delete "/permissions" api
* @param {Object} user - Mongo user object
* @param {string} permissionId - _id for permission object
* @returns {[(string|Array)]} - List of errors or undefined if there are no errors
*/
const deleteRequestValidator = (user, permissionId) => {
  let errors = []

  if (!user) {
    errors.push('No user was provided')
  }

  if (!permissionId) {
    errors.push('No permissionId was provided')
  }

  if (errors.length !== 0) {
    return errors
  }
}

/*
* @async
* @returns {Promise<string>}
*/
const getRequestHandler = async (user) => {
  winston.info('getRequestHandler', user)
  // TODO: Implement me
  // Returns the permissions for a user
  return 'getRequestHandler'
}

/*
* @async
* @returns {Promise<string>}
*/
const getByIdRequestHandler = async (user, permissionId) => {
  winston.info('getByIdRequestHandler', user, permissionId)
  // TODO: Implement me
  // Returns permission by user if if user has access to it
  return 'getByIdRequestHandler'
}

/*
* @async
* @returns {Promise<string>}
*/
const postRequestHandler = async (user, userId, documentId, permissionsType) => {
  winston.info('postRequestHandler', user, userId, documentId, permissionsType)
  // TODO: Implement me
  // grant permission for userId to documentId with permissionsType
  // only if user is has the "OWNER" permission over that documentId
  return 'postRequestHandler'
}

const deleteRequestHandler = async (user, permissionId) => {
  winston.info('deleteRequestHandler', user, permissionId)
  // TODO: Implement me
  // remove a permission by permissionId
  // only if user is has the "OWNER" permission over that documentId
  return 'deleteRequestHandler'
}

module.exports = {
  getRequestValidator,
  getByIdRequestValidator,
  postRequestValidator,
  deleteRequestValidator,
  getRequestHandler,
  getByIdRequestHandler,
  postRequestHandler,
  deleteRequestHandler
}
