import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import UserProfile from "./pages/UserProfille.jsx";
import Login from "./pages/Login.jsx";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import EcoAlert from "./pages/EcoAlert.jsx";
import EcoNews from "./pages/EcoNews.jsx";
import CreateAlertPost from "./pages/CreateAlertPost.jsx";
import AlertPostDetails from "./pages/AlertPostDetails.jsx";
import CreateArticle from "./pages/CreateArticle.jsx";
export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/create" element={<CreateArticle />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/alert/posts" element={<EcoAlert />} />
        <Route path="/news" element={<EcoNews />} />
        <Route path="/alert/create" element={<CreateAlertPost />} />
        <Route path="/alert/post/:alertPostID" element={<AlertPostDetails />} />
      </Routes>
    </div>
  );
}
