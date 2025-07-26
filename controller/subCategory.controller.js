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
    
    export {getSubCategoryController}