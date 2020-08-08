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
    const books = await bookRepo.getBestSelling();
    const results = books[0].purchaseQty - books[books.length-1].purchaseQty 
    await expect(results).toBeGreaterThan(0);
})

test('if the resulted array is 10 in length', async () => {
    const books = await bookRepo.getBestSelling();
    const results = books.length; 
    await expect(results).toEqual(10);
})