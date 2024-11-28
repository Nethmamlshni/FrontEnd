import Header from "../../Components/Header_Part/header";
function HomePage() {
    return (
      <>
                <div className="bg-[#FAF7F0] w-full h-screen flex flex-col items-center">
                 <Header />
                  <div className="bg-[#4A4947] h-auto p-8 m-[100px] rounded-3xl flex flex-col items-center space-y-6 shadow-lg">
                  <h2 className="text-[#D9A679] text-2xl font-bold">B O O K  N O W !</h2>
                  
                  <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                    <input
                      type="date"
                      className="px-4 py-2 rounded-lg border border-[#D9A679] bg-[#F4F0E8] text-[#4A4947] focus:outline-none focus:ring-2 focus:ring-[#A35D3B]"
                    />
                    <input
                      type="date"
                      className="px-4 py-2 rounded-lg border border-[#D9A679] bg-[#F4F0E8] text-[#4A4947] focus:outline-none focus:ring-2 focus:ring-[#A35D3B]"
                    />
                  </div>
                  
                  <select
                    className="px-4 py-2 rounded-lg border border-[#D9A679] bg-[#F4F0E8] text-[#4A4947] focus:outline-none focus:ring-2 focus:ring-[#A35D3B]"
                  >
                    <option value="luxury">Luxury</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="simple">Simple</option>
                  </select>
                  
                  <input
                    type="button"
                    value="Submit"
                    className="px-6 py-2 bg-[#2E8B57] text-white rounded-lg hover:bg-[#A35D3B] transition-all cursor-pointer"
                  />
                </div>
                </div>
        </>
                
    );
}

export default HomePage;