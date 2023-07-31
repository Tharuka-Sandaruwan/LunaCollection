//this errorMiddleware is configured to sends a json object as a response in an error, default error is in an HTML file format

//for urls that aint already defined
const notFound = (req, res, next) => {
	const error = new Error(`Not Found -${req.originalUrl}`)
	res.status(404)
	next(error)
}
//this overrides default error handler for that it needs to be a function that 1st takes in err as a parameter then req,res,next
const errorHandler = (err, req, res, next) => {
	//sometimes we get 200 status code even if its an error
	//500 means server error
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	})
}

export { notFound, errorHandler }
