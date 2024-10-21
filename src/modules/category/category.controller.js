const slugify=require('slugify')
const { uploadImage, deleteImage } = require("../../config/cloudinary.config");
const { filedelete } = require("../../utilities/helper");
const categorymodel = require("./category.model");
const categoryService = require("./category.service");

class categoryController {

    create = async (req, res, next) => {
        try {

            const data = req.body
            //console.log(data);
            
           const imageData  = await uploadImage("./public/uploads/category/" + req.file.filename);//gives image url and public id
           data.image = imageData.url;//data.image ma gayera bind hunxa url
           data.public_id=imageData.public_id;
           //slug
            data.slug=slugify(data.title,{lower:true});

            //delete img from local 
            filedelete("./public/uploads/category/" + req.file.filename);
            data.createdBy = req.authUser._id;

            const category = await categoryService.categorycreate(data)// category creation
            res.json({

                result:category,
                message: "Category Created successfully",
                meta: null
            })
            //console.log(data.image);
        

        } catch (exception) {
            console.log("exception category create!!!!!",exception);

            next(exception)
        }

    }

    details = async (req, res, next) => {
        try {
            const page = +req.query.page || 1
            const limit = +req.query.limit || 10
            const skip = (page - 1) * limit

            let filter = {};
            if (req.query.search) {
                filter = {
                    title: new RegExp(req.query.search, 'i')
                }
            }
            const { count, data } = await categoryService.listdata({
                skip: skip,
                limit: limit,
                filter: filter
            })


            res.json({
                result: data,
                message: "Total Category list",
                meta: {
                    currentpage: page,
                    total: count,
                    limit: limit
                }
            })

        } catch (exception) {
            console.log(exception);
            next(exception)

        }

    }

    show = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (!id) {
                next({ status: 400, message: "Id is required" })
            }
            const categoryDetails = await categoryService.getDetailbyfilter({
                _id: id//filter of req data
            })

            if (!categoryDetails) {
                throw ({ status: 404, message: "Category doesnot exist." })
            }
            res.json({
                result: categoryDetails,
                message: "Category Details.",
                meta: null
            })
        } catch (exception) {
            next(exception)
        }

    }

    update = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (!id) {
                next({ status: 400, message: "Id is required" })
            }
            const categoryDetails = await categoryService.getDetailbyfilter({
                _id: id//filter of req data
            })

            if (!categoryDetails) {
                throw ({ status: 404, message: "Category doesnot exist." })
            }

            const data = req.body
            if (req.image) {
                data.image = await uploadImage("./public/uploads/category/" + req.file.filename);
                filedelete("./public/uploads/category/" + req.file.filename);

            }
            const categoryUpdate = await categoryService.categoryUpdate(id, data)

            res.json({
                result: categoryUpdate,
                message: "Category updated successfully",
                meta: null
            })

        } catch (exception) {
            next(exception)
        }

    }

    delete = async (req, res, next) => {

        try {
            const {id,public_id} = req.params;
            if (!id || !public_id) {
                next({ status: 400, message: "Id is required" })
            }
            const categoryDetails = await categoryService.getDetailbyfilter({
                _id: id,//filter of req data
                public_id:public_id
            })

            if (!categoryDetails) {
                throw ({ status: 404, message: "Category doesnot exist." })
            }
            const categorydelete = await categoryService.categoryDelete(id);//delete from database
           
            const categorydeletecloud=await deleteImage(public_id) //delete from cloudinary

            res.json({
                result:categorydelete,
                message:"Category deleted successfully",
                meta:null
            })

        } catch (exception) {
            next(exception)
        }

    }
}

module.exports = new categoryController();