const { ObjectId } = require('mongodb');

const validator = require('../helpers/validate');
const saveBook = async (req, res, next) => {
    const validationRule = {
        "title": "required|string",
        "subtitle": "string",
        "isbn": "required|numeric",
        "author": "required|string",
        "publisher": "required|string",
        "publishedDate": "required|date",
        "genre": "required|string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

const validateId = async (req, res, next) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(412)
            .send({
                success: false,
                message: 'Invalid Id',
                data: {}
            });
    } else {
        next();
    }
};

const saveUser = async (req, res, next) => {
    const validationRule = {
        "firstName": "required|string",
        "lastName": "required|string",
        "email": "required|email",
        "favoriteBooks": "array"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

module.exports = {
    saveBook,
    validateId,
    saveUser
};