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
module.exports = {
    saveBook
};