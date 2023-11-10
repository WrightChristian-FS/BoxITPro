import Card from "../../components/Card/Card";
import Search from "../../components/Search/Search";
import Navbar from "../../components/Navbar/Navbar";
import ListDisplayPeople from "../../components/ListDisplay/ListDisplayPeople";
import "./People.css";

function People() {
  return (
    <main id="content-people">
      <h1>PEOPLE</h1>
      <Navbar page="PEOPLE" />
      <Search />
      <Card image="plus_blue.png" text="CREATE A PERSON" />
      <Card image="delete_blue.png" text="DELETE A PERSON" />
      <Card image="edit_blue.png" text="EDIT A PERSON" />
      <ListDisplayPeople table="people" />
    </main>
  );
}

export default People;
