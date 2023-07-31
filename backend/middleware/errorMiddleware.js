//this errorMiddleware is configured to sends a json object as a response in an error, default error is in an HTML file format

//for urls that aint already defined
const notFound = (req, res, next) => {
	const error = new Error(`Not Found -${req.originalUrl}`)
	res.status(404)
	next(error)
}
//this overrides default error handler for that it needs to be a function that 1st takes in err as a parameter then req,res,next

export { notFound }
