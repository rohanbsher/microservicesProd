import 'bootstrap/dist/css/bootstrap.min.css';

// we have defined our own custom app component using _app file
// A thin wrapper around the component that we are trying to show
// Any global CSS that must be included will be included here since it is the only file
// that will be started when we boot up
export default ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
}