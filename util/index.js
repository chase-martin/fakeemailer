const getReqData  = require("./getReqData");
const HTMLToText  = require("./HTMLToText");
const {
    BadRequestError,
    NotFoundError
}  = require("./apiErrors");

module.exports = {
    getReqData,
    HTMLToText,
    BadRequestError,
    NotFoundError
};