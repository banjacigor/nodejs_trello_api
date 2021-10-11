function validateParamsRequest(req, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  }
  const { error, value } = schema.validate(req.params, options)
  if (error) {
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`)
  } else {
    req.params = value
    next()
  }
}

function validateQueryRequest(req, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: false, // remove unknown props
  }
  const { error, value } = schema.validate(req.query, options)
  console.log(value)
  if (error) {
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`)
  } else {
    req.query = value
    next()
  }
}

function validateBodyRequest(req, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: false, // remove unknown props
  }
  const { error, value } = schema.validate(req.body, options)
  console.log(value)
  if (error) {
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`)
  } else {
    req.query = value
    next()
  }
}

module.exports = {
  validateParamsRequest,
  validateQueryRequest,
  validateBodyRequest,
}
