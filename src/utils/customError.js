const { STATUS_CODES } = require('http');

const ERRORS = {
    'CERR_41': {
        httpStatusCode: 401,
        message: 'Unauthorized',
        description: 'User is required to be authenticated before accessing this Endpoint'
    },
    'CERR_42': {
        httpStatusCode: 401,
        message: 'Unauthenticated',
        description: 'User authentication failed due to Invalid Credentials'
    },
    'CERR_43': (keyword, identifier) => {
        return {
            httpStatusCode: 401,
            message: 'Unauthenticated',
            description: `User authentication failure due to non-existence of ${keyword} - '${identifier}'`
        };
    },
    'CERR_44': (username) => {
        return {
            httpStatusCode: 409,
            message: 'Conflict',
            description: `A user with username '${username}' already exists`
        };
    },
    'CERR_45': {
        httpStatusCode: 404,
        message: 'Not Found',
        description: 'Unable to fetch data, as the Server does not seem to have this Endpoint'
    },
    'CERR_46': {
        httpStatusCode: 400,
        message: 'Bad Request',
        description: 'Invalid Request body'
    },
    'CERR_47': {
        httpStatusCode: 400,
        message: 'Bad Request',
        description: 'Invalid Request Parameters'
    },
    'CERR_51': {
        httpStatusCode: 500,
        message: 'Internal Server Error',
        description: 'Something went wrong on the Server side'
    }
};

class CustomError extends Error {
    constructor({
        httpStatusCode,
        message,
        description
    } = ERRORS.CERR_51) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.code = this.getValidHttpStatusCode(httpStatusCode);
        this.description = description;
    };

    getValidHttpStatusCode(code) {
        return Object.keys(STATUS_CODES).includes(code.toString()) ? code : 500;
    }
}

module.exports = {
    CustomError,
    ERRORS
};