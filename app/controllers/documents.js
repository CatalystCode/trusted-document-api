const winston = require('winston')
const blob = require("../services/azure/blob.js");
const blockchain = require("../services/blockchain/index.js");
const fs = require('fs');
/*
* Validates parameters for get "/documents" api
* @param {Object} body - request body
* @returns {[(string|Array)]} - List of errors or undefined if there are no errors
*/
const getRequestValidator = (body) => {
  let errors = []

  // Add more validating according to your program

  if (errors.length !== 0) {
    return errors
  }
}

/*
* Validates parameters for post "/documents" api
* @param {Object} body - request body
* @returns {[(string|Array)]} - List of errors or undefined if there are no errors
*/
const postRequestValidator = (body) => {
  let errors = []

  // Add more validating according to your program

  if (errors.length !== 0) {
    return errors
  }
}

/*
* @async
* @returns {Promise<string>}
*/
const getRequestHandler = async (user) => {
  winston.info('getRequestHandler', user);
  return 'Get will api was called'
}

/*
* @async
* @returns {Promise<string>}
*/
const postRequestHandler = async (user, files) => {

  winston.info('postRequestHandler', user);
  if (!files || !files[0]) {
    return
  }
  var file = files[0];

  var blobAdded = await blob.addBlob(user.emails[0], file);
  console.log(blobAdded)
  if (blobAdded) {
    try{
    var txHash = blockchain.logDocumentToBlockchain(file);
    console.log("Transaction hash - " + txHash);
    }
    catch(e){
      console.error(e);
    }
    fs.unlink(file.path, (err) => {
      if (err) throw err;
      console.log("File was uploaded to Blob Storage, logged to Blockchain and removed locally. Transaction hash - " + txHash);
      return "File was uploaded and deleted locally"
    });
  }
}

module.exports = {
  getRequestValidator,
  postRequestValidator,
  getRequestHandler,
  postRequestHandler
}
