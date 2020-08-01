const mongoose = require('mongoose');
const MONGO_SERVER = process.env.MONGO_SERVER || 'mongodb+srv://learning:hateherla@cluster0-dlmch.mongodb.net/reactp1?retryWrites=true&w=majority';

module.exports = {
    async connect() {
        try {
            console.log('attempt to connect')
            await mongoose.connect(
                `${MONGO_SERVER}`, {
                    useNewUrlParser: true
                }
            )
            console.log(`Connecting to db on ${MONGO_SERVER}`);
        } catch {
            console.log(`Error connecting to db: ${err}`);
        }
    },
    disconnect() {
        return mongoose.connection.close(() => {
            console.log('Database connection closed');
        })
    }
}