const express = require('express');
const router = express.Router();

const personRoutes = require('./routes/person.route');
const productRoutes = require('./routes/product.route');
const productCategoryRoutes = require('./routes/product-category.route');

router.get('/', (req, res) => {
  res.send('API Works!');
});

router.use('/persons', personRoutes);
router.use('/products', productRoutes);
router.use('/product-categories', productCategoryRoutes);

module.exports = router;
