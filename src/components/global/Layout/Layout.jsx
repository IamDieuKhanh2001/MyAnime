import "./Layout.scss";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
// import { Social } from './../Social/Social';

export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      {/* <Social/> */}
      {children}
      <Footer />
    </div>
  );
};
