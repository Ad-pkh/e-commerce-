const slugify=require('slugify')
const { uploadImage, deleteImage } = require("../../config/cloudinary.config");
const { filedelete } = require("../../utilities/helper");
const brandmodel = require("./brand.model");
const brandService = require("./brand.service");

class brandController {

    create = async (req, res, next) => {
        try {

            const data = req.body
            //console.log(data);
            
           const imageData  = await uploadImage("./public/uploads/brand/" + req.file.filename);//gives image url and public id
           data.image = imageData.url;//data.image ma gayera bind hunxa url
           data.public_id=imageData.public_id;
           //slug
            data.slug=slugify(data.title,{lower:true});

            //delete img from local 
            filedelete("./public/uploads/brand/" + req.file.filename);
            data.createdBy = req.authUser._id;

            const brand = await brandService.brandcreate(data)// brand creation
            res.json({

                result:brand,
                message: "Brand Created successfully",
                meta: null
            })
            //console.log(data.image);
        

        } catch (exception) {
            console.log("exception brand create!!!!!",exception);

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
            const { count, data } = await brandService.listdata({
                skip: skip,
                limit: limit,
                filter: filter
            })


            res.json({
                result: data,
                message: "Total Brand list",
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
            const brandDetails = await brandService.getDetailbyfilter({
                _id: id//filter of req data
            })

            if (!brandDetails) {
                throw ({ status: 404, message: "Brand doesnot exist." })
            }
            res.json({
                result: brandDetails,
                message: "Brand Details.",
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
            const brandDetails = await brandService.getDetailbyfilter({
                _id: id//filter of req data
            })

            if (!brandDetails) {
                throw ({ status: 404, message: "Brand doesnot exist." })
            }

            const data = req.body
            if (req.image) {
                data.image = await uploadImage("./public/uploads/brand/" + req.file.filename);
                filedelete("./public/uploads/brand/" + req.file.filename);

            }
            const brandUpdate = await brandService.brandUpdate(id, data)

            res.json({
                result: brandUpdate,
                message: "Brand updated successfully",
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
            const brandDetails = await brandService.getDetailbyfilter({
                _id: id,//filter of req data
                public_id:public_id
            })

            if (!brandDetails) {
                throw ({ status: 404, message: "Brand doesnot exist." })
            }
            const branddelete = await brandService.brandDelete(id);//delete from database
           
            const branddeletecloud=await deleteImage(public_id) //delete from cloudinary

            res.json({
                result:branddelete,
                message:"Brand deleted successfully",
                meta:null
            })

        } catch (exception) {
            next(exception)
        }

    }
}

module.exports = new brandController();