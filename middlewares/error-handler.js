import { CustomError } from "../errors/custom-error.js";

export const errorHandler = (err, req, res, next) => {

	// if(err instanceof CustomError)
	// {
	// 	return res.status(err.statusCode).json({msg: err.message});
	// }

	return res.status(err.statusCode || 500).json({msg : err.message});
}