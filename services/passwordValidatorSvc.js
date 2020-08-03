module.exports = {
    validatePassword(password, password2) {
        let errors = []
        password !== password2 && errors.push({
            message: "Passwords do not match"
        })
        password.length < 6 && errors.push({
            message: "Password should be at least 6 characters in length"
        })
        return errors
    }
}