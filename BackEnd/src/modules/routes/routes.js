const express = require('express');
const router = express.Router();

const {
  getAllItems,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/item.controller');

router.get('/allItems', getAllItems);
router.post('/createItem', createItem);
router.patch('/updateItem', updateItem);
router.delete('/deleteItem', deleteItem);

module.exports = router;