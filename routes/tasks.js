import express from 'express';
import { amendTask, createNewTask, deleteTask, getAllTasks, getTaskByID } from '../controllers/tasks.js';

export const tasksRouter = express.Router();  


tasksRouter.route('/')
	.get(getAllTasks)
	.post(createNewTask)
	
tasksRouter.route('/:id')
	.get(getTaskByID)
	.patch(amendTask) 
	.delete(deleteTask) 