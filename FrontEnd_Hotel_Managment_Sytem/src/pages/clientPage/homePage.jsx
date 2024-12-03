import Header from "../../Components/Header_Part/header";
function HomePage() {
    return (
      <>
        <div className="h-screen w-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url('/Photoes/li-yang-a8iCZvtrHpQ-unsplash.jpg')`, // Replace with your image URL
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed' }}>
               <Header className="backdrop-blur-md absolute top-0 left-0 right-0" />

                  <div className="backdrop-blur-md h-auto p-8 m-20 rounded-3xl flex flex-col items-center space-y-6 shadow-lg">
                  <h2 className="text-[#141413] text-2xl font-bold">B O O K  N O W !</h2>
                  
                  <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                    <input
                      type="date"
                      className="px-4 py-2 rounded-lg border border-[#151514] bg-[#F4F0E8] text-[#4A4947] focus:outline-none focus:ring-2 focus:ring-[#A35D3B]"
                    />
                    <input
                      type="date"
                      className="px-4 py-2 rounded-lg border border-[#0f0f0e] bg-[#F4F0E8] text-[#4A4947] focus:outline-none focus:ring-2 focus:ring-[#A35D3B]"
                    />
                  
                  
                  <select
                    className="px-4 py-2 rounded-lg border border-[#111110] bg-[#F4F0E8] text-[#4A4947] focus:outline-none focus:ring-2 focus:ring-[#A35D3B]"
                  >
                    <option value="luxury">Luxury</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="simple">Simple</option>
                  </select>
                  </div>
                  <input
                    type="button"
                    value="Submit"
                    className="px-6 py-2 bg-[#1d231f] text-white rounded-lg hover:bg-[#A35D3B] transition-all cursor-pointer"
                  />
                </div>
                </div>
        </>
                
    );
}

export default HomePage;