import Home from "./pages/Home/Home";
import Assets from "./pages/Assets/Assets";
import People from "./pages/People/People";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePerson from "./components/CreatePerson/CreatePerson";
import CreateAsset from "./components/CreateAsset/CreateAsset";
import FilterAssets from "./components/FilterAssets/FilterAssets";
import FilterPeople from "./components/FilterPerson/FilterPeople";
import DeletePerson from "./components/DeletePerson/DeletePerson";
import DeleteAsset from "./components/DeleteAsset/DeleteAsset";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/assets/create" element={<CreateAsset />} />
        <Route path="/assets/filter" element={<FilterAssets />} />
        <Route path="/people" element={<People />} />
        <Route path="/people/create" element={<CreatePerson />} />
        <Route path="/people/filter" element={<FilterPeople />} />
        <Route path="/people/delete" element={<DeletePerson />} />
        <Route path="/assets/delete" element={<DeleteAsset />} />


        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
