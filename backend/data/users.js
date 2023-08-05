import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'admin user',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'John Doe',
		email: 'John@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Jane Doe',
		email: 'Jane@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Crystal Reed',
		email: 'Crystal@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Mary Jane',
		email: 'Mary@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
]

export default users
