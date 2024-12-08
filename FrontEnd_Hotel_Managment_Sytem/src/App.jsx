import HomePage from "./pages/clientPage/homePage";
import AdminPage from "./pages/adminPage/admin_Page";
import NotFound from "./pages/Others/notFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/loginPage";
import Rooms from "./pages/clientPage/rooms/rooms";
import Categories from "./pages/clientPage/Catagories/catagories";
import GalleryPage from "./pages/clientPage/gallery/gallerypage";
import ClientFeedbackPages from "./pages/clientPage/feedback/feedbackPage";
import ClientFeedbackPage from "./pages/clientPage/feedback/appoveFeedback";
import UserDetailsLog from "./pages/clientPage/userDetails/userDetailsLog";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes path="/*">
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/catagories" element={<Categories />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/feedback" element={<ClientFeedbackPages />} />
        <Route path="/feedback/:id" element={<ClientFeedbackPage />} />
        <Route path="/userDetails" element={<UserDetailsLog />} />
       
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
