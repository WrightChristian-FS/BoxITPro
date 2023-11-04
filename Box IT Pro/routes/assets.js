const express = require("express");
const AssetController = require("../controllers/assets");

const router = express.Router();

router.post("/save-asset", AssetController.postAddAsset);

router.post('/delete-asset', AssetController.postDeleteAsset);

router.get('/get-asset',AssetController.getAssetsByData);


module.exports = router;
