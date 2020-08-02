const HTTP_RESPONSE_STATUS_CODE = require('../../config/statusCodes');

const buildJSONResponse = (data, isSuccess, message, errMessage) => {
    return {
        success: isSuccess,
        message: message,
        data: data,
        error: errMessage
    }
}

module.exports = {
    responseSuccessLogin (res, data, isSuccess, message, errMessage) {
        res.status(HTTP_RESPONSE_STATUS_CODE.OK).json(
            buildJSONResponse(data, isSuccess, message, errMessage)
        )
    },
    responseServerErr (res, data, isSuccess, message, errMessage) {
        res.status(HTTP_RESPONSE_STATUS_CODE.SERVERERR).json(
            buildJSONResponse(data, isSuccess, message, errMessage)
        )
    },
    responseUserErr (res, data, isSuccess, message, errMessage) {
        res.status(HTTP_RESPONSE_STATUS_CODE.NOTFOUND).json(
            buildJSONResponse(data, isSuccess, message, errMessage)
        )
    },
    responseCreateAccErr (res, data, isSuccess, message, errMessage) {
        res.status(HTTP_RESPONSE_STATUS_CODE.UNPROCESSABLE).json(
            buildJSONResponse(data, isSuccess, message, errMessage)
        )
    },
    responseSuccessAcc (res, data, isSuccess, message, errMessage) {
        res.status(HTTP_RESPONSE_STATUS_CODE.OK).json(
            buildJSONResponse(data, isSuccess, message, errMessage)
        )
    },
}