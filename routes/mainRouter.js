const express = require('express');

const {
  uploadImage,
  createProduct,
  getAllProducts,
  deleteProduct,
  editProduct,
  getSingleProduct,
} = require('../controller/mainController');

const router = express();

router.route('/uploads').post(uploadImage);
router.route('/create').post(createProduct);
router.route('/delete/:id').delete(deleteProduct);
router.route('/edit/:id').patch(editProduct);
router.route('/').get(getAllProducts);
router.route('/:id').get(getSingleProduct);

module.exports = router;
