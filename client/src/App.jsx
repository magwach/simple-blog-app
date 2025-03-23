import Header from "../components/header";
import AddBlogs from "../pages/add-blogs/add-blogs";
import HomePage from "../pages/home/home";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/add-blog" element={<AddBlogs />} />
      </Routes>
    </div>
  );
}

export default App;
