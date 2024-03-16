/**
 * The main component of the application.
 * Renders the navigation bar and sets up the routing for different pages.
 *
 * @returns {JSX.Element} The rendered App component.
 */
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
import Articles from "./pages/Articles.jsx";
import ArticleDetails from "./pages/ArticleDetails.jsx";

export default function App() {
  const { screenIsLoading } = useFirebase();
  return (
    <div>
      {screenIsLoading && <ScreenLoader />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/signup"
          element={<Navigate to={"/login"} state={{ signUpFirst: true }} />}
        />

        <Route path="/article" element={<Articles />} />
        <Route path="/article/create" element={<CreateArticle />} />
        <Route path="/article/post/:articleID" element={<ArticleDetails />} />

        <Route path="/alert" element={<EcoAlert />} />
        <Route path="/alert/create" element={<CreateAlertPost />} />
        <Route path="/alert/post/:alertPostID" element={<AlertPostDetails />} />
        <Route path="/news" element={<EcoNews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
