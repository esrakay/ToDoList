const {taskSchema} = require("./schemas");
const ExpressError = require("./utils/ExpressError");

module.exports.validateTask = (req, res, next) => {
    const {error} = taskSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }

}