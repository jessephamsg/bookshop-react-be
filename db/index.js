const dbType = process.env.NODE_ENV === 'test' ? 'memory' : 'db';
const db = require(`./${dbType}`);

module.exports = db;