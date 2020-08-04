module.exports = {
    buildDBErrMessage (methodName, err) {
        return `Database Error: cannot ${methodName} due to ${err.message}`
    },
    buildAuthRepoErrMsg (methodName, err) {
        return `Auth Error: cannot ${methodName} due to ${err.message}`
    },
}