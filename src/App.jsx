import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import FAQ from "./pages/FAQ";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import SubsManager from "./pages/SubsManager";
import { Toaster } from "react-hot-toast";
import UserProfile from "./pages/UserProfile";
import StartSharing from "./pages/StartSharing";
import { Messenger } from "./pages/Messenger";
import About from "./pages/About";
function App() {
  const { token } = useContext(AuthContext);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/startsharing" element={<StartSharing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/subsmanager" element={<SubsManager />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
