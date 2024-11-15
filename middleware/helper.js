// Other helper middlewares

// Print the request on console --dev
const printReq = (req, res, next) => {
    console.log(`method:${req.method} | url:${req.url}`);
    next();
};

// Global error handling middleware
const globalErrorHandler = ((err, req, res, next) => {
    console.error(err.stack);  // dev-log
    res.status(500).json({
        message: "Something went wrong!",
        error: err.message || err
    });
});

module.exports = { 
                    printReq,
                    globalErrorHandler
                };
