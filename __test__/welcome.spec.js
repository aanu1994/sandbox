
const supertest = require('supertest');
const app = require('../app');

describe("Testing the welcome API endpoint", () => {

	it("tests the base route that returns the welcome message", async () => {

		const response = await supertest(app).get('/');

		expect(response.status).toBe(200);
		expect(response.body.message).toBe('Welcome to the Novastone API');
	});
});