import  express  from "express";
import { tasksRouter } from "./routes/tasks.js";
import { conectionDB } from "./db/connect.js";
import dotenv from 'dotenv';
import { notFound } from "./middlewares/not-found.js";
import { errorHandler } from "./middlewares/error-handler.js";

const app = express();
const port = 3000;

dotenv.config();

// middleware
app.use(express.json());

app.use(express.static('./public'))

// routes 
app.use('/api/v1/tasks', tasksRouter)

app.use(notFound);
app.use(errorHandler);


const startConnection = async()=>{
	try {
		await conectionDB(process.env.MONGODB_URI);
		app.listen(port, function(){console.log(`Server is listening on port ${port}...`)});

		//console.log(conectionDB)
	} catch (error) {
		console.log(error);
	}
}


startConnection()





