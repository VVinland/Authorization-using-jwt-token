function errorMiddleware(err, req, res, next) {
    console.log(err);
    return res.status(401).json({ message: err.message });
}

export default errorMiddleware;