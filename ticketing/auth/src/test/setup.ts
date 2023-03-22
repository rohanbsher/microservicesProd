// This memory server creates a copy of MongoDB in memory
// Runs Multiple test suites at once instead of only using one Mongo server for testing
// Allows direct memory access to new mongo instance
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest'
import { app } from '../app';


declare global {
	var signin: () => Promise<string[]>;
}


let mongo: any;
// These are hooks that are executed before the application
// async Arrow function
beforeAll(async () => {
	process.env.JWT_KEY = 'asdf';

	// In memory server
	mongo = await MongoMemoryServer.create();
	const mongoUri = mongo.getUri();

	await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
	// beforeEach test starts reach out to mongo 
	// Deletes all the connections before running the tests
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

// Stop the server after running all the test suites
afterAll(async () => {
	if (mongo) {
		await mongo.stop();
	}
	await mongoose.connection.close();
});


global.signin = async () => {
	const email = 'test@test.com';
	const password = 'password';

	const response = await request(app)
		.post('/api/users/signup')
		.send({
			email,
			password
		})
		.expect(201);

	const cookie = response.get('Set-Cookie');

	return cookie;
};