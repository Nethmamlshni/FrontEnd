import HomePage from "./pages/clientPage/homePage";
import AdminPage from "./pages/adminPage/admin_Page";
import NotFound from "./pages/Others/notFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/loginPage";
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes path="/*">
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
       
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
