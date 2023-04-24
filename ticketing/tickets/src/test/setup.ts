// This memory server creates a copy of MongoDB in memory
// Runs Multiple test suites at once instead of only using one Mongo server for testing
// Allows direct memory access to new mongo instance
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest'
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
	var signin: () => string[];
}


let mongo: any;
// These are hooks that are executed before the application
// async Arrow function
beforeAll(async () => {
	process.env.JWT_KEY = 'whatever';

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


global.signin = () => {
	// build a JWT payload. { id, email }
	const payload = {
		id: new mongoose.Types.ObjectId().toHexString(),
		email: 'pass'
	};

	// create a JWT token
	const token = jwt.sign(payload, process.env.JWT_KEY!);

	// build a session object. {jwt: MY_JWT}
	const session = { jwt: token };

	// turn the session into json
	const sessionJson = JSON.stringify(session);

	// take json and encode to base64
	const base64 = Buffer.from(sessionJson).toString('base64');
	
	//return a string that the cookie with the encoded data
	return [`session=${base64}`];

};