import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
// import { Social } from "./components/global/Social/Social";
import AnimeDetail from "./components/pages/AnimeDetail/AnimeDetail";
import AnimeWatching from "./components/pages/AnimeWatching/AnimeWatching";
import Blog from "./components/pages/Blog/Blog";
import BlogDetail from "./components/pages/Blog/BlogDetail/BlogDetail";
import SignUp from "./components/pages/SignUp/SignUp";
import Profile from "./components/pages/Profile/Profile";
import Admin from "./components/pages/Admin/Admin";
import Dashboard from "./components/pages/Admin/Dashboard/Dashboard";
import Movie from "./components/pages/Admin/Movie/Movie";
import ProductList from "./components/pages/ProductList/ProductList";
import Category from "./components/pages/Category/Category";
import Customer from "./components/pages/Admin/Customer/Customer";
import Series from "./components/pages/Admin/Series/Series";

function App() {
  return (
    <>
      {/* <Social /> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/login2/:preRoute" element={<Login />} /> */}
          {/* <Route exact path="/signup2" element={<SignUp />} /> */}
          <Route path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/series-list" element={<ProductList />} />
          <Route exact path="/details/:seriesId" element={<AnimeDetail />} />
          <Route path="/watching/:seriesId" element={<AnimeWatching />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-detail" element={<BlogDetail />} />
          <Route path="/category" element={<Category />} />
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="series" element={<Series/>} />
            <Route path="movies" element={<Movie />} />
            <Route path="customers" element={<Customer/>} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
