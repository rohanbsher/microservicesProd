import buildClient from "../api/build-client";

const LandindPage = ({ currentUser }) => {
	return currentUser ? <h1>You are signed in</h1> : <h1>You are NOT signed in</h1>
}

// this is the only location where we can fetch data during server intialization
// we make a request from the server
LandindPage.getInitialProps = async (context) => {
	console.log("Landing Page")
	const client = buildClient(context);
	const { data } = await client.get('/api/users/currentuser');
	return data;
}

export default LandindPage