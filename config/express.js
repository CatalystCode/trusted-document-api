const glob = require('glob')
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const multer = require('multer')
const compress = require('compression')
const cors = require('cors')
const winston = require('winston')

/*
* Handles all HTTP method api calls to /api/echo and echoes the passed params
* @param {Object} app - express application
* @param {Object} config - app env variables
* @return {Object} app - configured express application
*/
module.exports = (app, config) => {
  app.locals.ENV = config.get('env')
  app.locals.ENV_DEVELOPMENT = config.get('isProduction')

  app.use(helmet())
  app.use(multer({dest: config.get('uploadFolder')}).any())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(cookieParser())
  app.use(compress())
  app.use(cors())

  // Pickup all the modules in app/api
  let apis = glob.sync(path.join(config.get('root'), 'app', 'apis', '*.js'))
  apis.forEach((api) => {
    require(api)(app)
  })

  app.use(express.static(path.join(config.get('root'), 'public')))

  // 404 handler
  app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // Return error if error was thrown (only return error message in prod)
  app.use((err, req, res, next) => {
    winston.error(err)
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: config.get('isProduction') ? {} : err
    })
  })

  return app
}
