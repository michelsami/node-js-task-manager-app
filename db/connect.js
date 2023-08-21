import  mongoose  from "mongoose"



export const conectionDB = (url)=>{
 return mongoose.connect(url, {
	useCreateIndex: true,
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology :true
})

}
