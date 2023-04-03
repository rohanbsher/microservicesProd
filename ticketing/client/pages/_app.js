import 'bootstrap/dist/css/bootstrap.min.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

// we have defined our own custom app component using _app file
// A thin wrapper around the component that we are trying to show
// Any global CSS that must be included will be included here since it is the only file
// that will be started when we boot up
const AppsComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<div>
			<Header currentUser={currentUser} />
			<Component {...pageProps} />
		</div>
	);
};

AppsComponent.getInitialProps = async (appContext) => {
	// two kinds of different context ctx is suppose to go to indivudal pages 
	// and appComponent context is inteded to go to the app component
	const client = buildClient(appContext.ctx);
	const { data } = await client.get('/api/users/currentuser');
	let pageProps = {};
	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(appContext.ctx);
	}

	return {
		pageProps,
		...data
	}
};

export default AppsComponent;

