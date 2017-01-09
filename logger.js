module.exports = (req, res, next) => {
    var start = +new Date(),
    stream = process.stdout,
    url = req.url,
    method = req.method;
    
    res.on('finish', () => {
        var duration = +new Date() - start,
        message = method+' to '+url+' took '
        +duration+' ms \n';
        stream.write(message);
    });
    
    next();
};