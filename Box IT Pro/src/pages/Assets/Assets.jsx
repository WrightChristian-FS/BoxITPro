import Card from "../../components/Card/Card";
import Search from "../../components/Search/Search";
import Navbar from "../../components/Navbar/Navbar";
import "./Assets.css";
import ListDisplayAssets from "../../components/ListDisplay/ListDisplayAssets";

function Assets() {
  return (
    <main id="content-assets">
      <h1>ASSETS</h1>
      <Navbar page="ASSETS" />
      <Search />
      <Card image="plus_blue.png" text="CREATE AN ASSET" />
      <Card image="delete_blue.png" text="DELETE AN ASSET" />
      <Card image="edit_blue.png" text="EDIT AN ASSET" />
      <ListDisplayAssets />
    </main>
  );
}

export default Assets;
