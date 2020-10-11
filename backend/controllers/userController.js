const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken.js')
const User = require('../models/userModel.js')

/**
 * @description Fetch all products
 * @access public no authentication required
 * @route GET /api/products
 */

/**
 * @description Delete a product
 * @access private admin
 * @route DELETE /api/products/:id
 */


/**
 * @description Authenticate user & get token
 * @access public no authentication required
 * @route POST /api/users/login
 */
exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

/**
 * @description Register a new user
 * @access public no authentication required
 * @route POST /api/users
 */
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


/**
 * @description Get user profile
 * @access protected logged in user
 * @route GET /api/users/profile
 */
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

/**
 * @description Update user profile
 * @access protected logged in user
 * @route PUT /api/users/profile
 */
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


/**
 * @description Get all users
 * @access private admin
 * @route GET /api/users
 */
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

/**
 * @description Delete user
 * @access private admin
 * @route DELETE /api/users/:id
 */
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

/**
 * @description Get user by ID
 * @access private admin
 * @route GET /api/users/:id
 */
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

/**
 * @description Update user
 * @access private admin
 * @route PUT /api/users/:id
 */
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
