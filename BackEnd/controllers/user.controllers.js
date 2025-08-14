import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'
import bcrypt from 'bcrypt'

// Generate token
const generateToken = (userId) => {
    const payload = { id: userId }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// Register user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please fill all fields' })
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' })
        }

        if (!/^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(password)) {
            return res.status(400).json({ success: false, message: 'Password must contain at least one number and one special character'})
        }

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword })
        const token = generateToken(user._id.toString())

        res.status(201).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email }
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please fill all fields' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' })
        }

        const token = generateToken(user._id.toString())

        res.status(200).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email }
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Get user data using token 

export const getUserData = async(req , res) =>{
    try {
        const {user} = req;
        res.status(200).json({ success: true, user })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}