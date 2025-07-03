import bcrypt from 'bcryptjs'
import UserModel from '../../models/userModel.js'
import jwt from 'jsonwebtoken'

// // register controller // //
const registerController = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body

    if (!name || !email || !password || !gender) {
      return res.status(400).json({
        error: true,
        success: false,
        message: 'all required fild must provide',
      })
    }
    const already = await UserModel.findOne({ email })
    if (already) {
      return res.status(400).json({
        error: true,
        success: false,
        message: 'User Already exists with the same email! Please try again',
      })
    }

    let hashedPassword = bcrypt.hashSync(password, 10)
    const user = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
      gender: gender,
    })
    const newUser = await user.save()
    res.status(201).json({
      error: false,
      success: true,
      data: newUser,
      message: 'success',
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `server error ${error}`,
    })
  }
}

// // end of register controller// //

//  // login controller // //
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        success: false,
        message: 'all required fild must provide',
      })
    }

    const user = await UserModel.findOne({ email })
    if (user) {
      const checkPass = bcrypt.compareSync(password, user.password)
      if (!checkPass) {
        return res.status(400).json({
          error: true,
          success: false,
          message: 'password is wrong 😡😡',
        })
      } else {
        const tokenData = {
          _id: user._id,
        }
        const tokenOption = {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 8,
        })

        res.status(200).cookie('token', token, tokenOption).json({
          error: false,
          success: true,
          message: 'successfully loged in',
          data: token,
        })
      }
    } else {
      return res.status(404).json({
        error: true,
        success: false,
        message: 'User doesnt exists! Please register first',
      })
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `server error ${error}`,
    })
  }
}
//  // end of login controller //

// // logout controller //
const logoutController = async (req, res) => {
  try {
    res.clearCookie('token')

    res.status(200).json({
      success: true,
      error: false,
      message: 'successfully logged Out✨✨',
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: 'server error',
    })
  }
}
// // logout controller //

//  // user details controller //

const userDetailsController = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)

    if (user) {
      return res.status(200).json({
        error: false,
        success: true,
        data: user,
        message: 'operation success',
      })
    } else {
      return res.status(404).json({
        error: true,
        success: false,
        message: 'user not found',
      })
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `server error ${error}`,
    })
  }
}

export {
  registerController,
  loginController,
  logoutController,
  userDetailsController,
}
