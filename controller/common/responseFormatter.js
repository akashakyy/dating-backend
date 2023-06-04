

function success(res, message = 'Success', data){
    return res.status(200).json({
        'status':200,
        'message': message,
        'data': data
    })
}

function internalError(res, message = 'Interal Server Error'){
    return res.status(503).json({
        'status':503,
        'message': message,
    })
}

function unauthorized(res, message = 'Interal Server Error'){
    return res.status(401).json({
        'status':401,
        'message': message,
    })
}

function badRequest(res, message = ''){
    return res.status(400).json({
        'status':400,
        'message': message,
    })
}


module.exports = {
    success,
    internalError,
    unauthorized,
    badRequest
}