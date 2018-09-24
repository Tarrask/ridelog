
const Joi = require('joi');

const inputsEmpty = {
  headers: Joi.object(),
  body: Joi.object().optional(),
  query: Joi.object()
};

function jsonExitsValidationDecorator(func, schema) {
  return function(body) {
    // restoring the json undecorated function as it is used by response handler
    this.json = func;

    // validating the response body
    const result = Joi.validate(body, schema['' + this.statusCode]);

    // respond with a 500-serverError if the response body is not valid
    if(result.error) {
      return this.serverError(result.error);
    }

    // when the response is valid, call the real json function with the sanitized value
    func.call(this, result.value);
  };
}

module.exports = async function(req, res, next) {
  // check if a validation option is define for this route
  const validation = req.options.validation;
  if(!validation) {
    return next();
  }

  // validating headers, body and query only
  const inputsResult = Joi.validate({
    headers: req.headers,
    body: req.body,
    query: req.query
  }, Object.assign(inputsEmpty, sails.config.schemas[validation.inputs]));

  // response with a 400-badRequest if the validation failed
  if(inputsResult.error) {
    return res.badRequest(inputsResult.error);
  }

  // redefined headers, body and query with the validated values
  req = Object.assign(req, inputsResult.value);

  // res.send = validationDecorator(res.send);
  // decorate the res.json function with the validation code
  res.json = jsonExitsValidationDecorator(res.json, sails.config.schemas[validation.exits]);

  // finally call the rest of the middlewares
  next();
};
