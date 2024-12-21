import { BrowserRouter, Routes, Route } from "react-router";
import Register from "./views/Register";
import Login from "./views/Login";
import BaseLayout from "./views/BaseLayout";
import ListMovies from "./views/ListMovies";
import ListGenre from "./views/ListGenre";
import AddMovie from "./views/AddMovies";
import EditMovie from "./views/EditMovie";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<BaseLayout />}>
            <Route index element={<ListMovies />} />
            <Route path="/add" element={<AddMovie />} />
            <Route path="/edit/:id" element={<EditMovie />} />
            <Route path="/genres" element={<ListGenre />} />
            <Route path="/add-user" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
