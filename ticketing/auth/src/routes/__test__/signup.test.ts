// Super test allows us to fake a request to express application
import request from 'supertest';
import { app } from '../../app'

// description of the test
it('returns a 201 on successful signup', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(201)
});

it('returns a 400 on invalid email', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'testtestcom',
			password: 'password'
		})
		.expect(400)
})

it('returns a 400 on invalid password', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: ''
		})
		.expect(400)
})

// await or return either one works since it waits on return 
it('returns a 400 on missing email and password', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: "test@test.com"
		})
		.expect(400)

	return request(app)
		.post('/api/users/signup')
		.send({
			password: "password"
		})
		.expect(400)
})

it('dissallows invalid email and password', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(201)

	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(400)
})

it('it sets a cookie after successful signup', async () => {
	const response = await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})	
		.expect(201)
	
	expect(response.get('Set-Cookie')).toBeDefined()
});


