

const getAllCategoriesController = async (req , res) => {

        try {
                
    
        } catch (error) {
                res.status(500).json({
                        error: true ,
                        success : false ,
                        message : `server error ${error}`
                })
        }
}

export default getAllCategoriesController