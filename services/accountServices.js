const authRepositories = require('../repositories/authRepositories');

module.exports = {
    async findOne(filter) {
        const result = await authRepositories.findOne(filter);
        return result
    },
    async createOne(name, email, password) {
        await authRepositories.createOne(name, email, password);
        return true
    },
    async googleAuthFindOne(filter) {
        const result = await authRepositories.googleAuthFindOne(filter);
        return result
    },
    async createGoogleUser(name, email) {
        const result = await authRepositories.createGoogleUser(name, email);
        return result
    },
}