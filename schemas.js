const Joi = require('joi');

module.exports.taskSchema = Joi.object({
    task: Joi.string()
        .required()
})