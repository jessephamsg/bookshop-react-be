const db = require('../../db');
const bookRepo = require('../bookRepositories');
const TEST_DATA = require('../testSeed/books.json');

beforeAll(async () => {
    await db.connect();
    await bookRepo.createMany(TEST_DATA);
});

afterAll(async () => {
    await db.disconnect();
})

test('if the resulted array is sorted in descending order', async () => {
    const books = await bookRepo.getHighestRating();
    const result = books[0].avgRating - books[books.length-1].avgRating
    await expect(result).toBeGreaterThan(0);
})

test('if the resulted array is 10 in length', async () => {
    const books = await bookRepo.getHighestRating();
    const result = books.length; 
    await expect(result).toEqual(10);
})