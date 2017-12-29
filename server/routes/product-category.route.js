const express = require('express');
const router = express.Router();
const ProductCategory = require('../models/product-category');

router.get('/', (req, res, next) => {
  ProductCategory.find((err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});

router.get('/:id', (req, res, next) => {
  ProductCategory.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/', (req, res, next) => {
  ProductCategory.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', (req, res, next) => {
  ProductCategory.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', (req, res, next) => {
  ProductCategory.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
