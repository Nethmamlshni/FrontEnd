function UserData(Props) {
    return (
      <div className="flex absolute right-0  rounded-lg mr-4">
        <img
          className="h-16 w-16 rounded-full border-2 border-[#B17457]"
          src={Props.img}
          alt="User Profile"
        />
        <h1 className="ml-4 text-lg font-semibold text-[#4A4947]">{Props.name}</h1>
      </div>
    );
  }
  
  export default UserData;
  