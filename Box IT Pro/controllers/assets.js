const Asset = require("../models/assets");

exports.postAddAsset = (req, res, next) => {
  const {
    name,
    make,
    model,
    serialnumber,
    purchaseprice,
    assigneduser,
    laptop,
    mobile,
    desktop,
    date,
  } = req.body;

  Asset.create({
    name: name,
    make: make,
    model: model,
    serialNumber: serialnumber,
    assignedTo: assigneduser,
    price: purchaseprice,
    laptop: laptop,
    mobile: mobile,
    desktop: desktop,
    date: date,
  })
    .then((result) => {
      // Asset created successfully
      console.log(result);
      res.status(200).json({ message: "Asset created successfully" });
    })
    .catch((err) => {
      // Error occurred while creating the asset
      console.log(err);
      res.status(500).json({ error: "Failed to create asset" });
    });
};

exports.postDeleteAsset = (req, res, next) => {
  const assetId = req.query.assetId;

  if (Array.isArray(assetId)) {
    Asset.destroy({
      where: {
        id: assetId,
      },
    })
      .then((result) => {
        if (result === 0) {
          return res.status(404).send("No assets found");
        }
        console.log("DESTROYED Assets");
        res.status(200).send("Asset destroyed");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Server error");
      });
  } else {
    Asset.findByPk(assetId)
      .then((asset) => {
        if (!asset) {
          return res.status(404).send("Asset not found");
        }
        return asset.destroy();
      })
      .then((result) => {
        console.log("DESTROYED ASSETS");
        res.status(200).send("Asset destroyed");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Server error");
      });
  }
};

exports.getAssetsByData = (req, res, next) => {
  const { type, make, model, assigned, warranty } = req.query;

  const filteringData = {};
  if (assigned) {
    filteringData.assigned = assigned;
  }
  if (warranty) {
    filteringData.warranty = warranty;
  }
  if (type) {
    filteringData.type = type;
  }

  if (make) {
    filteringData.make = make;
  }

  if (model) {
    filteringData.model = model;
  }

  Asset.findAll({ where: filteringData })
    .then((assets) => {
      if (assets.length === 0) {
        return res.status(404).json({ message: "No assets found" });
      }
      console.log(assets);
      res.status(200).json(assets);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch assets" });
    });
};
