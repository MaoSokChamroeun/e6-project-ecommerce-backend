const express = require('express')
const bannerRouter = express.Router()
const {clientProtect} = require('../middleware/client.middleware')
const {getAllBanners,createBanner,findBannerById,updateBannerById,deleteBannerById,getAllPublicBanners} = require('../controller/banner.controller')
const {restricGuard} = require('../guard/restric.guard')
const { uploadBannerFile } = require('../controller/upload.controller')
const {protect} = require('../middleware/auth.middleware')
bannerRouter.route("/")
            .get(protect , restricGuard('admin') , getAllBanners)
            .post(protect, restricGuard('admin') ,uploadBannerFile , createBanner)
 
bannerRouter.route('/public')
            .get(getAllPublicBanners)
bannerRouter.route("/:id")
            .get(protect,restricGuard('admin') , findBannerById)
            .put(protect,restricGuard('admin') ,uploadBannerFile, updateBannerById)
            .delete(protect,restricGuard('admin') , deleteBannerById)


module.exports = bannerRouter