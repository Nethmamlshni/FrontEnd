import Header from "./Components/Header_Part/header";
import HomePage from "./pages/clientPage/homePage";
import AdminPage from "./pages/adminPage/admin_Page";
import Test from "./Components/test/test";
import NotFound from "./pages/Others/notFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/loginPage";
import Catagories from "./pages/clientPage/Catagories/catagories" ;
import Rooms from "./pages/clientPage/rooms/rooms";
import GalleryPage from "./pages/clientPage/gallery/gallerypage";
import FeedbackPages from "./pages/clientPage/feedback/feedbackPage";
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes path="/*">
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/catagories" element={<Catagories />} />
        <Route path="/rooms" element={<Rooms />} />   
        <Route path="/gallery" element={<GalleryPage />} /> 
        <Route path="/feedback" element={<FeedbackPages />} />    
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
