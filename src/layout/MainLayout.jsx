import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
const MainLayout = () => {
  const location = useLocation();
  const { pathname } = location;

  const hideFooter = pathname === "/login" || pathname === "/signup";
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Outlet />
      {!hideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
