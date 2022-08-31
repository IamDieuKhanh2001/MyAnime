import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
// import { Social } from "./components/global/Social/Social";
import Category from "./components/pages/Category/Category";
import AnimeDetail from "./components/pages/AnimeDetail/AnimeDetail";
import AnimeWatching from "./components/pages/AnimeWatching/AnimeWatching";
import Blog from "./components/pages/Blog/Blog";
import BlogDetail from "./components/pages/Blog/BlogDetail/BlogDetail";
import SignUp from "./components/pages/SignUp/SignUp";
import Profile from "./components/pages/Profile/Profile";

function App() {
  return (
    <>
      {/* <Social /> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/login/:preRoute" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/category" element={<Category />} />
          <Route path="/details" element={<AnimeDetail />} />
          <Route path="/watching" element={<AnimeWatching />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-detail" element={<BlogDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
