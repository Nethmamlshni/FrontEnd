/*import UserData from "../User_Part/userData";
function Header() {
    return (
      <div className=" w-full h-20 flex justify-between items-center px-6 shadow-md">
        <h1 className="text-3xl font-bold font-serif text-white tracking-wide">
          Hotel Sara
        </h1>
        <div className="flex items-center space-x-4 cursor-pointer hover:bg-[#D9A679] p-2 rounded-lg transition-all">
          <UserData img="Photoes/download.png" name="Dasun" />
        </div>
      </div>
    );
  }
  
  export default Header;*/

  import UserData from "../User_Part/userData";

function Header() {
  return (
    <div className="w-full h-20 flex justify-between items-center px-6 shadow-md bg-gray-800">
      <h1 className="text-3xl font-bold font-serif text-white tracking-wide">
        Hotel Sara
      </h1>
      <div className="flex items-center space-x-4">
        <UserData />
      </div>
    </div>
  );
}

export default Header;

  