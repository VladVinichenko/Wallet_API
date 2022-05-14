module.exports = (cb) => (req, res, next) => {
    return cb(req,res,next).catch((error) => next(error))
}

