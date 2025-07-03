

const getAllClothController = async (req , res)=>{

        try {
     

                res.status(200).json({
                        error:false ,
                        success: true ,
                        message: "success" ,
                 
                })
                
        } catch (error) {
                res.status(500).json({
                        error: true,
                        success: false,
                        message: `server error ${error}`,
                      })
        }
}


export default getAllClothController