import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
