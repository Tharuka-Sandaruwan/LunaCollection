import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		// variatons:[{color:{type:String,required:true},sizes:[{type:String,required:true}],stock:{type:Number,required:true}}],
		orderItems: [
			{
				name: { type: String, required: true },
				qty: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				reviewed: { type: Boolean, default: false },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			// country: { type: String, required: true },
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},

		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		shipping: {
			type: Object,
			required: true,
			default: { isShipped: false, shippedAt: String },
		},

		shippingPrice: {
			type: Number,
			required: true,
			default: 0,
		},
		delivery: {
			type: Object,
			required: true,
			default: { isDelivered: false, deliveredAt: String },
		},
		completed: { type: Boolean, required: true, default: false },
	},
	{
		timestamps: true,
	}
)

const Order = mongoose.model('Order', orderSchema)
export default Order
