import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserModel from '../../models/userModel.js'
import sendEmail from '../../config/sendEmail.js'
import verifyEmailTemplate from '../../utils/verifyEmailTemplates.js'
import cloudinary from '../../utils/cloudinaryUpload.js'
import generatedOtp from '../../utils/generatedOtp.js'
import forgotPasswordTemplate from '../../utils/forgotPasswordTemplate.js'

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

    const verifyEmailUrl = `http://localhost:5173/verify-email?code=${newUser._id}`
    const verifyEmailSend = await sendEmail({
      sendTo: email,
      subject: 'Verify email from Shopysam',
      html: verifyEmailTemplate(name, verifyEmailUrl),
    })

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

// // verify email controller// //
const verifyEmailController = async (req, res) => {
  try {
    const { code } = req.body

    const user = await UserModel.findById(code)

    if (!user) {
      return res.status(404).json({
        error: true,
        success: false,
        message: 'Invalid Code',
      })
    }
    const updateUser = await UserModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    )
    res.status(200).json({
      error: false,
      success: true,
      message: 'verify Email Done ❤❤✨',
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `server error ${error}`,
    })
  }
}

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
    if (!user) {
      return res.status(404).json({
        error: true,
        success: false,
        message: 'User doesnt exists! Please register first',
      })
    }

    // if (!user?.verify_email) {
    //   return res.status(402).json({
    //     error: true,
    //     success: false,
    //     message: 'Verify Your Email First ',
    //   })
    // }

    if (user?.status !== 'Active') {
      return res.status(402).json({
        error: true,
        success: false,
        message: 'Contact to Admin',
      })
    }

    const checkPass = bcrypt.compareSync(password, user.password)
    if (!checkPass) {
      return res.status(400).json({
        error: true,
        success: false,
        message: 'password is wrong 😡😡',
      })
    } else {
      const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
        last_login_date: new Date(),
      })
      const tokenData = {
        _id: user._id,
      }
      const tokenOption = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      }
      const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: '12h',
      })
      res.cookie('token', token, tokenOption)
      return res.json({
        message: 'Login successfully',
        error: false,
        success: true,
        data: {
          token,
        },
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

// // logout controller //
const logoutController = async (req, res) => {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    }
    res.clearCookie('token', tokenOption)

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

// // upload avatar controller //
const uploadAvatarController = async (req, res) => {
  try {
    const userId = req.userId
    const fileStr = req.body.data
    const upload = await cloudinary.uploader.upload(fileStr,{upload_preset:'shopysam'})
    console.log(upload)
    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: upload?.url,
    },{new:true})

    res.status(200).json({
      error: false,
      success: true,
      message: 'upload successfully',
      data: updateUser,
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `server error ${error} `,
    })
  }
}


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

// // update user details // //
const updateUserDetailsController = async (req, res) => {
  try {
    const userId = req.userId //auth middleware
    const { name, email, mobile, password, gender } = req.body

    let hashPassword = ''
    if (password) {
      hashPassword = await bcrypt.hashSync(password, 10)
    }
    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(gender && { gender: gender }),
        ...(password && { password: hashPassword }),
      },
      { new: true }
    )

    res.status(200).json({
      error: false,
      success: true,
      message: 'successfully updated',
      data: updateUser,
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `server error ${error}`,
    })
  }
}

//forgot password not login // //
const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body
    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(404).json({
        message: 'Email not available',
        error: true,
        success: false,
      })
    }
    const otp = generatedOtp()
    const expireTime = new Date() + 60 * 60 * 1000 // 1hr

    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toISOString(),
    })

    await sendEmail({
      sendTo: email,
      subject: 'Forgot password from Shopysam',
      html: forgotPasswordTemplate({
        name: user.name,
        otp: otp,
      }),
    })

    return res.json({
      message: 'check your email',
      error: false,
      success: true,
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: `server error ${error}`,
    })
  }
}

//  // verify forgot password otp // //
const verifyForgotPasswordOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body

    if (!email || !otp) {
      return res.status(400).json({
        message: 'Provide required field email, otp.',
        error: true,
        success: false,
      })
    }

    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: 'Email not available',
        error: true,
        success: false,
      })
    }

    const currentTime = new Date().toISOString()

    if (user.forgot_password_expiry < currentTime) {
      return res.status(400).json({
        message: 'Otp is expired',
        error: true,
        success: false,
      })
    }

    if (otp !== user.forgot_password_otp) {
      return res.status(400).json({
        message: 'Invalid otp',
        error: true,
        success: false,
      })
    }

    //if otp is not expired
    //otp === user.forgot_password_otp

    const updateUser = await UserModel.findByIdAndUpdate(
      user?._id,
      {
        forgot_password_otp: '',
        forgot_password_expiry: '',
      },
      { new: true }
    )

    return res.json({
      message: 'Verify otp successfully',
      error: false,
      success: true,
    })
  } catch (error) {
    return res.status(500).json({
      message: `server error ${error}`,
      error: true,
      success: false,
    })
  }
}

// // reset password // //
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body

    if (!email || !newPassword) {
      return res.status(400).json({
        error: true,
        success: false,
        message: 'provide required fields email, newPassword',
      })
    }

    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(404).json({
        message: 'Email is not available',
        error: true,
        success: false,
      })
    }

    const hashPassword = await bcrypt.hashSync(newPassword, 10)

    const update = await UserModel.findOneAndUpdate(
      user._id,
      {
        password: hashPassword,
      },
      { new: true }
    )

    return res.json({
      message: 'Password updated successfully.',
      error: false,
      success: true,
      data: update,
    })
  } catch (error) {
    return res.status(500).json({
      message: `server error ${error}`,
      error: true,
      success: false,
    })
  }
}

export {
  registerController,
  loginController,
  logoutController,
  userDetailsController,
  verifyEmailController,
  uploadAvatarController,
  updateUserDetailsController,
  forgotPasswordController,
  verifyForgotPasswordOtpController,
  resetPasswordController,
}
