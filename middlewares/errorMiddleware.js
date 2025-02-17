const errorMiddleware = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        msg: err.message || 'Internal server error',
    });
}

module.exports = errorMiddleware;