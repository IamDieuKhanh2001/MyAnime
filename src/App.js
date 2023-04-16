import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import React from 'react';
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
import History from "./components/pages/History/History";
import { ToastContainer } from "react-toastify";
import Episode from "./components/pages/Admin/Episode/Episode";
import SearchKeyword from "./components/pages/SearchKeyword/SearchKeyword";
import AuthenRoute from "./routes/AuthenRoute";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import FavoriteSeries from "./components/pages/FavoriteSeries/FavoriteSeries";
import AuthenIdCard from "./components/pages/AuthenIdCard/AuthenIdCard";
import SubscriptionRedeemHistory from "./components/pages/SubscriptionRedeemHistory/SubscriptionRedeemHistory";
import RedeemGiftCode from "./components/pages/RedeemGiftCode/RedeemGiftCode";
import GiftCode from "./components/pages/Admin/GiftCode/GiftCode";
import ForgotPassword from "./components/pages/ForgotPassword/ForgotPassword";
import Test from "./components/pages/TestPage/Test";
import ScrollToTop from "./components/global/ScrollToTop/ScrollToTop";


function App() {
    const username = window.sessionStorage.getItem("role");
    const role = window.sessionStorage.getItem("role");

    return (
        <>
            {/* <Social /> */}
            <Router>
            {/* reset to top page when redirect to another page */}
                <ScrollToTop> 
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/verify-age" element={<AuthenIdCard />} />
                        <Route exact path="/signup" element={<SignUp />} />
                        <Route path="*" element={<Navigate to="/" />} />
                        <Route path="/series-list" element={<ProductList />} />
                        <Route
                            exact
                            path="/details/:seriesId"
                            element={<AnimeDetail />}
                        />
                        <Route
                            path="/watching/:seriesId"
                            element={<AnimeWatching />}
                        />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog-detail" element={<BlogDetail />} />
                        <Route
                            path="/category/:categoryId"
                            element={<Category />}
                        />
                        <Route path="/history" element={<History />} />

                        {/* administrator page route */}
                        {
                            username && role === "ROLE_ADMIN" ? <Route path="/admin" element={<Admin />}>
                                <Route index element={<Dashboard />} />
                                <Route path="series" element={<Series />} />
                                <Route path="movies" element={<Movie />} />
                                <Route path="episodes" element={<Episode />} />
                                <Route path="customers" element={<Customer />} />
                                <Route path="giftcode" element={<GiftCode />} />
                            </Route> :
                                <Route path="/admin/*" element={<Home />} />
                        }

                        <Route path="/series/search/:kw" element={<SearchKeyword />} />
                        <Route path="/subscription/history" element={<SubscriptionRedeemHistory />} />
                        <Route path="/redeem" element={<RedeemGiftCode />} />
                        <Route path="/reset-password" element={<ForgotPassword />} />
                        <Route path="*" element={<Navigate to="/" />} />
                        {/* Test components / Will be removed when deploy */}
                        <Route path="/test" element={<Test />} />
                    </Routes>
                </ScrollToTop>

            </Router>
            <ToastContainer />
            <Helmet>
                <script src=
                    // "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
                    "/js/jquery-3.3.1.min.js"
                    type="text/javascript" />
            </Helmet>
        </>
    );
}

export default App;
