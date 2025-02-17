const adminMiddleware = (req, res, next) => {
    if (req.role !== 'admin') return res.status(403).send('Forbidden');
    next();
}

module.exports = { adminMiddleware };