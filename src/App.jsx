import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import UserProfile from "./pages/UserProfille.jsx";
import Login from "./pages/Login.jsx";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import EcoAlert from "./pages/EcoAlert.jsx";
import EcoNews from "./pages/EcoNews.jsx";
export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/alert" element={<EcoAlert />} />
        <Route path="/news" element={<EcoNews />} />
      </Routes>
    </div>
  );
}
