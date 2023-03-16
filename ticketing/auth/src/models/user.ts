import mongoose from "mongoose";

// An interface that describes the properties that are required to create a new User
interface UserAttrs {
	email: string;
	password: string;
}

// An interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<any> {
	build(attrs: UserAttrs): any;
}	

const userSchema = new mongoose.Schema({
	// specific to mongose to define built in constructor String built in JS as the type of the field
	email: {
		type: String,
		required: true
	},

	password: {
		type: String,
		required: true
	}
});

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
}

const User = mongoose.model('User', userSchema);

//using this function for effective type checking
// const buildUser = (attrs: UserAttrs): UserAttrs => {
// 	return new User(attrs);
// }

// buildUser({ email: 'test@test.com', password: 'password' });


export { User };