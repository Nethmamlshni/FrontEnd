  import UserData from "../User_Part/userData";
  import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="w-full h-20 flex justify-between items-center px-6 shadow-md bg-gray-800">
      <h1 className="text-3xl font-bold font-serif text-white tracking-wide">
        Hotel Sara
      </h1>
      <nav className="backdrop-blur-md text-white py-4 px-6 flex justify-center">
      <div className="space-x-6">
     
        <Link to="/" className="hover:text-[#A35D3B] transition-all">Home</Link>
        <Link to="/rooms" className="hover:text-[#A35D3B] transition-all">Room </Link>
        <Link to="/feedback" className="hover:text-[#A35D3B] transition-all">Feedback</Link>
        <Link to="/gallery" className="hover:text-[#A35D3B] transition-all">Gallery</Link>
        <Link to="/catagories" className="hover:text-[#A35D3B] transition-all">Categories</Link>
        <Link to="/login" className="hover:text-[#A35D3B] transition-all">Login</Link>
        <Link to="Setting" className="hover:text-[#A35D3B] transition-all">Setting</Link>
      </div>
    </nav>
      <div className="flex items-center space-x-4">
        <UserData />
      </div>
    </div>
  );
}

export default Header;

  