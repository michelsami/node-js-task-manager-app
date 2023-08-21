import mongoose  from "mongoose";


const TaskSchema = new mongoose.Schema({
	name : {
		type : String,
		required : [true, "Please provide a name for this task"],
		trim: true,
		maxlength : [20 , "Name can't be more than 20 characters"]
	},
	completed:{
		type: Boolean,
		default: false,
	},
	createdAt: { type: Date, default: Date.now }

});


export const taskModel = mongoose.model('task', TaskSchema);