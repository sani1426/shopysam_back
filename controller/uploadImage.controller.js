import uploadImageClodinary from "../utils/cloudinaryUpload.js"

const uploadImageController = async (req,res) =>{
        try {
                const file = req.file

        const uploadImage = await uploadImageClodinary(file)

        return res.json({
            message : "Upload done",
            data : uploadImage,
            success : true,
            error : false
        })
                
        } catch (error) {
                res.status(500).json({
                        error: true ,
                        success : false ,
                        message : `Server Error ${error}`
                })
        }
}
export {uploadImageController}