import jwt from 'jsonwebtoken'

async function verifyToken(req, res, next) {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(404).json({
        message: 'Please Login...!',
        error: true,
        success: false,
      })
    }
    const decode = await jwt.verify(token,process.env.JWT_SECRET)
    if(!decode){
      return response.status(401).json({
          message : "unauthorized access",
          error : true,
          success : false
      })
  }

      req.userId = decode?._id

      next()
    
  } catch (err) {
    res.status(500).json({
      message: `Server Error ${err}`,
      error: true,
      success: false,
    })
  }
}

export default verifyToken
