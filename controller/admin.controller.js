import UserModel from "../models/userModel.js"

const getAllUsersController = async (req, res) => {
  try {
        const users = await UserModel.find()
        const totalUser = await UserModel.countDocuments()

        res.status(200).json({
                error:false ,
                success: true ,
                message:'successfully get all users' ,
                data:users ,
                counter:totalUser
        })
  } catch (error) {
    return res.status(500).json({
      message: `server error ${error}`,
      error: true,
      success: false,
    })
  }
}

export {getAllUsersController}