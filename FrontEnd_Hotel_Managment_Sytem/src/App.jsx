import Header from "./Components/Header_Part/header";
import HomePage from "./pages/clientPage/homePage";
import AdminPage from "./pages/adminPage/admin_Page";
import Test from "./Components/test/test";
import NotFound from "./pages/Others/notFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes path="/*">
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/*" element={<NotFound />} />
        
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
