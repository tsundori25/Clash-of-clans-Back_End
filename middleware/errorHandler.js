module.exports = (err, req, res, next) => {
    let code;
    let name = err.name;
    let message;

    switch (name) {
        case 'EMAIL ALREADY EXISTS':
            code = 409;
            message = 'EMAIL Already Exists!';
            break;
        case 'ERROR':
            code = 500;
            message = 'Error!';
            break;
        case 'LOGIN_FAIL':
            code = 401;
            message = 'Email and password combination not found!';
            break;
        case 'MISSING_TOKEN':
            code = 401;
            message = 'Missing access token!';
            break;
        case 'INVALID_TOKEN':
            code = 401;
            message = 'Invalid access token!';
            break;
        case 'NOT_FOUND':
            code = 404;
            message = 'Resource not found!';
            break;
        case 'FORBIDDEN':
            code = 403;
            message = 'No access!';
            break;
        default:
            code = 500;
            message = 'Internal server error!';
    }

    res.status(code).json({
        response: 'failed',
        message
    });
};