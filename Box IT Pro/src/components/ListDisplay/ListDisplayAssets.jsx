import React, { useState, useEffect } from "react";
import "./ListDisplayPeople.css";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DeleteAsset from "../DeleteAsset/DeleteAsset";

function ListDisplayAssets() {
  const [assets, setAssets] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const asset = location.state?.data;

  const fetchAllAssets = async () => {
    try {
      const response = await fetch("https://be.boxitbro.mohamedradwan.me/api/all-assets");
      const result = await response.json();
      if (result.assets && Array.isArray(result.assets)) {
        setAssets(result.assets);
      } else {
        console.error("Invalid data format:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (asset && Array.isArray(asset) && asset.length > 0) {
      setAssets(asset);
    } else {
      fetchAllAssets();
    }
  }, [asset]);

  const handleDelete = (id) => {
    setSelectedAssetId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  let type;
  assets.map((asset, index) => {
    // Determine the type of asset
    if (asset.mobile === true) {
      type = "Mobile";
    } else if (asset.laptop === true) {
      type = "Laptop";
    } else if (asset.desktop === true) {
      type = "Desktop";
    }
  });

  console.log(asset);

  return (
    <>
      <div id="display-table">
        <div id="filter-group">
          <Link to="filter">
            <img src="filter.svg" alt="Filter" width={30} />
          </Link>
          <Button onClick={fetchAllAssets}>Display All Assets</Button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Delete</th>
              <th>Type</th>
              <th>Name</th>
              <th>Make</th>
              <th>Model</th>
              <th>Serial Number</th>
              <th>Assigned To</th>
              <th>PRICE</th>
              <th>WARRANTY</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => {
              let type; // Determine the type of asset for each row
              if (asset.mobile) {
                type = "Mobile";
              } else if (asset.laptop) {
                type = "Laptop";
              } else if (asset.desktop) {
                type = "Desktop";
              }

              return (
                <tr key={index}>
                  <button
                    onClick={() => handleDelete(asset.id)}
                    id="delete-icon"
                  >
                    <img src="bin.svg" alt="Delete" width={25} />
                  </button>
                  <td>{type}</td>
                  <td>{asset.name}</td>
                  <td>{asset.make}</td>
                  <td>{asset.model}</td>
                  <td>{asset.serialNumber}</td>
                  <td>{asset.assignedTo}</td>
                  <td>{asset.price}</td>
                  <td>{asset.warranty}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showModal && (
          <DeleteAsset
            assetId={selectedAssetId}
            onSuccess={fetchAllAssets}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
}

export default ListDisplayAssets;
