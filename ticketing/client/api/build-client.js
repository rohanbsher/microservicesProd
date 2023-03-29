import axios from 'axios';

export default ({ req }) => {
	if (typeof window === 'undefined') {
		// make a request from server to the ingress service
		return axios.create({
			baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
			headers: req.headers
		});
	} else {
		return axios.create({
			baseURL: '/'
		});
	}
};