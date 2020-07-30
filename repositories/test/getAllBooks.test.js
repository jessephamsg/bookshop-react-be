const db = require('../../db');
const bookRepo = require('../bookRepositories');

const TEST_DATA = {
    title: "harry Potter",
    author: "j k rowling",
    img: "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/7/30/1406719196162/b57b6007-afb1-4e3c-8263-b29f6534aee8-1360x2040.jpeg?width=700&quality=85&auto=format&fit=max&s=ac278c37a7564a3950831f264b08e215",
    description: "Adaptation of the first of J.K. Rowling's popular childrens novels about Harry Potter, a boy who learns on his eleventh birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own. He is summoned from his life as an unwanted child to become a student at Hogwarts, an English boarding school for wizards. There, he meets several friends who become his closest allies and help him discover the truth about his parents' mysterious deaths.",
    originalPrice: 98,
    discountedPrice: 14,
    quantity: 0,
    theme: "Fiction",
    avgRating: 0,
    format: "Paperback",
    publisher: "Bloomsbury Publishing",
    purchaseQty: Math.floor((Math.random() * 200) + 1),
    reviews: [],
    dimensions: {
        width: 129,
        height: 198,
        thickness: 24
    }
}

beforeAll(async () => {
    await db.connect();
    await bookRepo.createOne(TEST_DATA);
});

afterAll(async () => {
    await db.disconnect();
})

test('if the resulted array has length greater than 0', async () => {
    const results = await bookRepo.getAll();
    await expect(results.length).toBeGreaterThan(0);
})