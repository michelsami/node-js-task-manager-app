import { createCustomError } from "../errors/custom-error.js";
import { asyncFactory } from "../middlewares/async-factory.js";
import { taskModel } from "../models/task.js"

export const getAllTasks = asyncFactory(
	   async (req, res, next) =>{
		const tasks =  await taskModel.find().sort({  completed: 1 ,createdAt: -1}) ;
		res.status(200).json({ tasks});
	}
	
);

export const getTaskByID = asyncFactory(
	async (req, res, next)=> {
				const taskID = req.params.id;
				const task = await taskModel.find({ _id: taskID });
				if(task == "") {

					return next(createCustomError(`No such task found for task ID: ${taskID}`, 404));
					//return	res.status(404).json({errorMessage : "No such task found for task ID: " + taskID});
				}
				res.status(200).json({ task});
	}
)

// async(req, res) => {

	
// 	try {
// 		const taskID = req.params.id;
// 		const task = await taskModel.find({ _id: taskID });
// 		if(task == "") {
// 		return	res.status(404).json({errorMessage : "No such task found for task ID: " + taskID});
// 		}
// 		res.status(200).json({ task});
// 	} catch (error) {
// 		res.status(500).json({errorMessage: error});

// 	}
// }


export const createNewTask = asyncFactory( async (req, res, next) => {


		const newTask = await taskModel.create(req.body)
		res.status(201).json(newTask);

});

export const amendTask = asyncFactory(async (req, res, next) => {

		const taskID = req.params.id;
		
		const task = await taskModel.findOneAndUpdate({_id: taskID}, req.body,
			 {
			new:true,
			runValidators: true,
		}
		);
		if(!task) {
			return next(createCustomError(`No such task found for task ID: ${taskID}`, 404));

			//return	res.status(404).json({errorMessage : "No such task found for task ID: " + taskID});
			}
		res.status(200).json({ task});

});

export const deleteTask = asyncFactory( async(req, res, next) => {

		const taskID = req.params.id;
		const taskFound = await taskModel.findOneAndDelete({ _id: taskID });
		
		if(!taskFound) {
			return next(createCustomError(`No such task found for task ID: ${taskID}`, 404));

		//return	res.status(404).json({errorMessage : "No such task found for task ID: " + taskID});
		}
		res.status(200).json({message: "task deleted successfully"});

})