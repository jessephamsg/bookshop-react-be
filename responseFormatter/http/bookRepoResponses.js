const HTTP_RESPONSE_STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    NOTFOUND: 404,
    SERVERERR: 500,
    BADGATEWAY: 502,
    GATEWAYTIMEOUT: 504
}

const buildJSONResponse = (req, isSuccess, payload) => {
    const msg = isSuccess === true ?
        `Successfully ${req.method} book data at path ${req.originalUrl}` :
        `Failed to ${req.method} book data at path ${req.originalUrl}`
    return {
        success: isSuccess,
        method: req.method,
        path: req.originalUrl,
        message: msg,
        data: payload
    }
}

module.exports = {
    responseOK(req, res, payload) {
        res.status(
                HTTP_RESPONSE_STATUS_CODE.OK)
            .json(buildJSONResponse(req, true, payload))
    },
    responseNotFound(req, res, payload) {
        res.status(
                HTTP_RESPONSE_STATUS_CODE.NOTFOUND)
            .json(buildJSONResponse(req, false, payload))
    }
}