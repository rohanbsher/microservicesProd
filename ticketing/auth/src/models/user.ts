import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties that are required to create a new User
interface UserAttrs {
	email: string;
	password: string;
}

// An interface that describes the properties that a User Model has
// which is the entire collection of the data
// Wrapper for UserDoc
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a single User Document has
// Document represents one single record
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
}, {
	toJSON: {
		transform(doc, ret) {
			// Json representations always represent id insteaf of _id
			ret.id = ret._id;
			delete ret._id;
			delete ret.password;
			delete ret.__v;
		}
	}
});

userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	done();
});

// Create a a build function in userModel for typescript understanding
userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
}

// generic types being provided to model as arguments
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

//using this function for effective type checking
// const buildUser = (attrs: UserAttrs): UserAttrs => {
// 	return new User(attrs);
// }

// buildUser({ email: 'test@test.com', password: 'password' });


export { User };