const authRepositories = require('../repositories/authRepositories');
const accountRepositories = require('../repositories/accountRepositories');
const dataFormatter = require('./bookServices').formatReturnedData
const bookRepositories = require('../repositories/bookRepositories');


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
    async updateUserOrderHistory (email, orderArr) {
        const rawOrderArr = orderArr.map(order => order.raw);
        const orderArrID = rawOrderArr.map(order => order.id);
        await accountRepositories.updateUserOrderHistoryByEmail (email, orderArrID);
        return
    },
    async getUserOrderHistory (email) {
        const bookIDs = await accountRepositories.getUserOrderHistory(email);
        const bookObjects = [];
        for (const bookID of bookIDs) {
            bookObjects.push(await bookRepositories.getBookById(bookID));
        }
        const formattedResult = dataFormatter(bookObjects);
        return formattedResult
    },
    async updateUserProfile (userID, updatedInfo) {
        const result = await accountRepositories.updateUserProfile(userID, updatedInfo);
        return result
    }
}