import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";

const MainLayout = () => {
  return (
    <div>
      <NavBar />

      <Outlet />
      {/* <div className="md:flex hidden"> */}
      <Footer />
      {/* </div> */}
    </div>
  );
};

export default MainLayout;
