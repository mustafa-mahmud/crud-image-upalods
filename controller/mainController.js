const path = require('path');
const { unlink } = require('node:fs/promises');
const ProductModel = require('../model/mainModel');

const uploadImage = async (req, res) => {
  const imageName = `${Date.now()}_${req.files.image.name}`;

  const folderPath = path.join(__dirname, '../public/uploads/' + imageName);

  try {
    await req.files.image.mv(folderPath);

    res.status(200).json({
      msg: `Your image ${req.files.image.name} uploaded successfully`,
      imageName,
    });
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong, Pls try later...' });
  }
};

const createProduct = async (req, res) => {
  try {
    await ProductModel.create(req.body.product);

    res.status(200).json({ msg: 'Your product uploaded successfully' });
  } catch (err) {
    console.log(err);
  }
};

const getAllProducts = async (req, res) => {
  const products = await ProductModel.find({});

  res.status(200).json({ products });
};

const unLinkImage = async (id) => {
  //get image name from DB
  let imageName = await ProductModel.findOne({ _id: id });
  imageName = imageName.image;
  //delete image from folder
  await unlink(path.join(__dirname, '../public/uploads/' + imageName));
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    //unlink image
    unLinkImage(id);

    //delete data from DB
    await ProductModel.deleteOne({ _id: id });

    //get rest data from DB
    const products = await ProductModel.find({});

    res.status(200).json({
      msg: `Product ${id} deleted successfully`,
      products: products.filter((item) => String(item.id) !== id),
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await ProductModel.findOne({ _id: id });

    res.status(200).json({ product: result });
  } catch (err) {
    console.log(err);
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.body.edit.image) {
      unLinkImage(id);
    }

    await ProductModel.findByIdAndUpdate({ _id: id }, req.body.edit, {
      new: true,
    });

    res.status(200).json({ msg: 'Your product edited successfully' });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  uploadImage,
  createProduct,
  getAllProducts,
  deleteProduct,
  editProduct,
  getSingleProduct,
};
