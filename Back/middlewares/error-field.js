

function errorField ( error, req, res, next){
    // Logging the rejected field from multer error
        console.log('This is the rejected field ->', error.field);
        next(error)
};

module.exports = errorField