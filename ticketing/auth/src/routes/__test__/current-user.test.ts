import request from 'supertest'
import { app } from '../../app'

// Cookie gets sent with the first request but not the second
// we're going to want to send authenticated requests which have the cookie included in it
it('reponds with the details of the current user', async () => {
	const cookie = await global.signin();

	console.log(cookie);

	const response = await request(app)
		.get('/api/users/currentuser')
		.set('Cookie', cookie)
		.send()
		.expect(200);

	expect(response.body.currentUser.email).toEqual('test@test.com')
});

it('reponds with null if not authenticated', async () => {


	const response = await request(app)
		.get('/api/users/currentuser')
		.send()
		.expect(200);

	expect(response.body.currentUser).toEqual(null)
});