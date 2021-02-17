const Purchase = require('../../db/models/items/index');

module.exports.getAllItems = (req, res, next) => {
  Purchase.find().then(result => {
    res.send({data: result});
  });
};

module.exports.createItem = (req, res, next) => {
  const cost = new Purchase(req.body);
  cost.save().then(() => {
    Purchase.find().then(result => {
      res.send({data: result});
    });
  });
};

module.exports.updateItem = (req, res, next) => {
  Purchase.updateOne({_id: req.body._id},req.body).then(result => {
    Purchase.find().then(result => {
      res.send({data: result});
    });
  });
};

module.exports.deleteItem = (req, res, next) => {
  Purchase.deleteOne({_id: req.query.id}).then(result => {
    Purchase.find().then(result => {
      res.send({data: result});
    });
  });
};
