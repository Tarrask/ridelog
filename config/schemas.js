
const Joi = require('joi');

module.exports.schemas = {
  'empty': { 
    headers: Joi.object().required(),
    body: Joi.object().keys({}).optional(),
    query: Joi.object().keys({}).required() 
  },

  'loginForm': {
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    }).required()
  },

  'rideForm': {
    body: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string(),
      reliveLink: Joi.string(),
      youtubeLink: Joi.string(),
      odo: Joi.number().allow(null)
    }).required()
  },

  'successOut': {
    '200': Joi.any()
  },
  'userOut': {
    '200': {
      data: Joi.object().keys({
        id: Joi.any().required(),
        username: Joi.string().required(),
        email: Joi.string().required(),
        role: Joi.string().allow('user', 'admin').required(),
        createdAt: Joi.number().strip(),
        updatedAt: Joi.number().strip(),
        passwordHash: Joi.string().strip(),
      }).required()
    },
    '401': Joi.any(),
    '500': Joi.any()
  }
};
