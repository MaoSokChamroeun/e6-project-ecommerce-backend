const Banner = require("../model/banner.model");


const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPublicBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createBanner = async (req, res) => {
  try {
    const banners = await Banner.create({
      image: req.file ? req.file.path : "",
    });
    if (!banners) {
      return res.status(400).json({
        success: false,
        message: "Banner not created",
      });
    }

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const findBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }
    res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {};
    if (req.file) {
      updateData.image = req.file.path;
    }
    const updatedBanner = await Banner.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }, // 'new: true' returns the updated document
    );

    if (!updatedBanner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: updatedBanner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    const banners = await Banner.findByIdAndDelete(id);
    if (!banners) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Banner delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllBanners,
  createBanner,
  findBannerById,
  updateBannerById,
  deleteBannerById,
  getAllPublicBanners,
};
