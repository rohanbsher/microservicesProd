import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError{
	readonly statusCode = 500;
	readonly reason = 'Error connecting to database';
	constructor(){
		super("Error connecting to db");

		// Only because we are extending a built in class
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serializeErrors(){
		return [
			{ message: this.reason }
		];
	}
}