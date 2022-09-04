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
import Admin from './components/pages/Admin/Admin';
import ProductList from "./components/pages/ProductList/ProductList";

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
          <Route path="/series-list" element={<ProductList />} />
          <Route path="/details" element={<AnimeDetail />} />
          <Route path="/watching" element={<AnimeWatching />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-detail" element={<BlogDetail />} />
          <Route path="/admin" element={<Admin/>}>
            {/* <Route index element={<AdminDashBoard />} />
            <Route path="categories" element={<AdminCategory />} />
            <Route path="products" element={<AdminProduct />} />
            <Route path="customers" element={<AdminCustomer />} />
            <Route path="orders" element={<AdminOrder />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
