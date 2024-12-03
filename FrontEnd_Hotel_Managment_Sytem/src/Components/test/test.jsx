import { useState } from "react";
function Test() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
        <button
          onClick={() => {
            const newNum = count + 1;
            setCount(newNum);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition duration-300"
        >
          +
        </button>
        <span className="text-2xl font-bold text-gray-700">{count}</span>
        <button
          onClick={() => {
            const newNum = count - 1;
            setCount(newNum);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-300"
        >
          -
        </button>
      </div>
    </div>
  );
}
 export default Test;