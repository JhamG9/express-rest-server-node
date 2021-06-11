const { validationResult } = require('express-validator');


const validateFields = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    // Continua con la petición normal
    next();
}

module.exports = {
    validateFields
}