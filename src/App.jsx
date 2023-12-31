import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Login from "./pages/Login.jsx";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import EcoAlert from "./pages/EcoAlert.jsx";
import EcoNews from "./pages/EcoNews.jsx";
import CreateAlertPost from "./pages/CreateAlertPost.jsx";
import AlertPostDetails from "./pages/AlertPostDetails.jsx";
import CreateArticle from "./pages/CreateArticle.jsx";
import NotFound from "./pages/NotFound.jsx";
import ScreenLoader from "./components/ScreenLoader.jsx";
import { useFirebase } from "./context/FirebaseContext.jsx";

export default function App() {
  const { screenIsLoading } = useFirebase();
  return (
    <div>
      {screenIsLoading && <ScreenLoader />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/create" element={<CreateArticle />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/signup"
          element={<Navigate to={"/login"} state={{ signUpFirst: true }} />}
        />
        <Route path="/alert/posts" element={<EcoAlert />} />
        <Route path="/news" element={<EcoNews />} />
        <Route path="/alert/create" element={<CreateAlertPost />} />
        <Route path="/alert/post/:alertPostID" element={<AlertPostDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
