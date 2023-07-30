import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import AWS from 'aws-sdk'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import overviewRoutes from './routes/overviewRoutes.js'

//this connects env file with the config file
dotenv.config()
connectDB()

const region = 'ap-south-1'
const myCredentials = {
	accessKeyId: process.env.ACCESSKEYIDS3BUCKET,
	secretAccessKey: process.env.SECRETKEYS3BUCKET,
}
export const s3 = new AWS.S3({
	credentials: myCredentials,
	region: region,
})
const app = express()
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}


app.use(express.json())

app.get('/', (req, res) => {
	res.send('API is running......')
})

//this redirects any url with /api/products to route in productRoutes
app.use('/api/products', productRoutes)

//this redirects any url with /api/users to route in userRoutes
app.use('/api/users', userRoutes)
app.use('/api/overview', overviewRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/reviews', reviewRoutes)


app.get('/api/config/paypal', (req, res) => {
	res.json(process.env.PAYPAL_CLIENT_ID)
})

app.use(notFound)



const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)
