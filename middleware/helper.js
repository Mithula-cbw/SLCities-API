// Other helper middlewares

// Print the request on console --dev
const printReq = (req, res, next) => {
    console.log(`method:${req.method} | url:${req.url}`);
    next();
};

module.exports = { printReq };
