import mongoose from "mongoose";

// An interface that describes the properties that are required to create a new User
interface UserAttrs {
	email: string;
	password: string;
}

// An interface that describes the properties that a User Model has
// Wrapper for UserDoc
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User Document has
// This where the mongoose document is extended to add custom properties to User
interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
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

// Using generic type to define the type of the model
// generic types being provided to function as arguments
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

//using this function for effective type checking
// const buildUser = (attrs: UserAttrs): UserAttrs => {
// 	return new User(attrs);
// }

// buildUser({ email: 'test@test.com', password: 'password' });


export { User };