import SubCategoryModel from "../models/subCategory.model.js"


const getSubCategoryController = async(req,res)=>{
        try {
            const data = await SubCategoryModel.find().sort({createdAt : -1}).populate('category')
            return res.json({
                message : "Sub Category data",
                data : data,
                error : false,
                success : true
            })
        } catch (error) {
            return res.status(500).json({
                message : error.message || error,
                error : true,
                success : false
            })
        }
    }


    const getSubCategoryByCategoryId = async (req , res) => {

        try {
            const {categoryId} = req.body

            if (!categoryId) {
                return res.status(400).json({
                    error : true ,
                    success : false ,
                    message : "Must Provide Valid Id"
                })
            }

            const sub = await SubCategoryModel.find({
                category: { $in: categoryId },
            })

            if (!sub) {
                return res.status(404).json({
                    error : true ,
                    success : true ,
                    message : "Sub Category Not Found"
                })
            }

            return res.status(200).json({
                error : false ,
                success : true ,
                message : 'Successfully Found Sub Category' ,
                data : sub
            })
        } catch (error) {
            return res.status(500).json({
                error : true ,
                success : false ,
                message : `Server Error ${error}`
            })
        }


        
    }
    
    export {getSubCategoryController , getSubCategoryByCategoryId}