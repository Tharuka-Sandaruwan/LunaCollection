import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//@desc Authenticate user & get token in login
//@route POST/api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })
	if (user && (await user.matchPassword(password))) {
		const token = generateToken(user._id)
		res.cookie('token', token, { maxAge: 8 * 60 * 60 * 1000, secure: true })
		res.cookie('isAdmin', user.isAdmin, {
			maxAge: 8 * 60 * 60 * 1000,
			secure: true,
		})
		res.cookie('name', user.name, {
			maxAge: 8 * 60 * 60 * 1000,
			secure: true,
		})
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: token,
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or password')
	}
})

//@desc Register a new user and provide a token
//@route POST/api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const userExist = await User.findOne({ email })
	if (userExist) {
		res.status(400)
		throw new Error('User already exists')
	}
	const user = await User.create({ name, email, password })
	if (user) {
		const token = generateToken(user._id)
		res.cookie('token', token, { maxAge: 8 * 60 * 60 * 1000, secure: true })
		res.cookie('isAdmin', user.isAdmin, {
			maxAge: 8 * 60 * 60 * 1000,
			secure: true,
		})
		res.cookie('name', user.name, {
			maxAge: 8 * 60 * 60 * 1000,
			secure: true,
		})
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: token,
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data ')
	}
})

//@desc Get user profile
//@route GET/api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(401)
		throw new Error('User not found')
	}
})
//@desc Get all users
//@route GET/api/users/
//@access Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select('-password')
	res.json(users)
})
//@desc Delete User
//@route DELETE/api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)
	if (user) {
		await user.remove()
		res.json({ message: 'user removed' })
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})
//@desc Get user by ID
//@route GET/api/users/:id
//@access Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password')

	if (user) {
		res.json(user)
	} else {
		res.status(401)
		throw new Error('User not found')
	}
})

export {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getAllUsers,
	deleteUser,
	getUserByID,
	updateUser,
}
