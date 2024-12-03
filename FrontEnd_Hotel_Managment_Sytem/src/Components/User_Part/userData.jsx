function UserData(Props) {
    return (
      <div className="flex absolute right-0  rounded-lg mr-4">
        <img
          className="h-16 w-16 rounded-full border-2 border-[#fbfaf9]"
          src={Props.img}
          alt="User Profile"
        />
        <h1 className="ml-4 text-lg font-semibold text-[#f8f7f6]">{Props.name}</h1>
      </div>
    );
  }
  
  export default UserData;
  