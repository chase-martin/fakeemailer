class BadRequestError extends Error {
    constructor(message = "Bad request.", ...args){
        super(...[message, ...args]);
        this.name = "BadRequestError";
        this.status_code = "400";
    }
}

class NotFoundError extends Error {
    constructor(message = "Route not found.", ...args){
        super(...[message, ...args]);
        this.name = "NotFoundError";
        this.status_code = "404";
    }
}

class ApiError extends Error {
    constructor(message = "An API error occured.", ...args){
        super(...[message, ...args]);
        this.name = "ApiError";
        this.status_code = "500";
    }
}

module.exports = {
    BadRequestError,
    NotFoundError,
    ApiError
};