import axios from 'axios'
import { useState } from 'react'

// Method must be post, get or patch 
export default ({ url, method, body }) => {
	const [errors, setErrors] = useState(null);

	const doRequest = async () => {
		try {
			const response = await axios[method](url, body);
			return response.data

		} catch (err) {
			setErrors(
				<div className="alert alert-danger">
					<h3>Oooops ....</h3>
					<ul className="my-0">
						{err.response.data.errors.map((err) => (
							<li key={err.message}>{err.message}</li>
						))}
					</ul>
				</div>
			);
		}
	};
	return { doRequest, errors }
};