import Card from "../../components/Card/Card";
import Search from "../../components/Search/Search";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";

function Home() {
  return (
    <main id="content">
      <Navbar page="HOME" />
      <Search />
      <Card image="assets_blue.png" text="ASSETS" />
      <Card image="people_blue.png" text="PEOPLE" />
    </main>
  );
}

export default Home;
