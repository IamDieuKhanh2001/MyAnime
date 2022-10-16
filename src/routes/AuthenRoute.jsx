import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import Login from './../components/pages/Login/Login';


const AuthenRoute = (props) => {
    const user = useSelector((state) => state.users);
    return <Route {...props}>{user ? props.children : <Login/>}</Route>;
};
export default AuthenRoute;
