
import React from "react";

const bookings = [
  {
    roomNumber: "B001",
    checkInDate: "2024-12-01",
    checkOutDate: "2024-12-05",
    totalPrice: 500,
    status: "Confirmed",
    createdAt: "2024-11-28",
    notes: "Sea-facing room requested",
  },
  {
    roomNumber: "B002",
    checkInDate: "2024-12-10",
    checkOutDate: "2024-12-15",
    totalPrice: 750,
    status: "Pending",
    createdAt: "2024-11-26",
    notes: "Near the pool",
  },
  {
    roomNumber: "B003",
    checkInDate: "2024-12-20",
    checkOutDate: "2024-12-25",
    totalPrice: 1000,
    status: "Cancelled",
    createdAt: "2024-11-25",
    notes: "Anniversary celebration",
  },
  {
    roomNumber: "B004",
    checkInDate: "2024-11-29",
    checkOutDate: "2024-12-02",
    totalPrice: 300,
    status: "Confirmed",
    createdAt: "2024-11-24",
    notes: "Early check-in requested",
  },
  {
    roomNumber: "B005",
    checkInDate: "2024-12-15",
    checkOutDate: "2024-12-17",
    totalPrice: 400,
    status: "Pending",
    createdAt: "2024-11-27",
    notes: null,
  },
];

function AdminBooking() {
  return (
    <div className="flex flex-col items-center h-full w-full px-6">
      <h1 className="text-4xl font-bold text-[#4A4947] mb-8">
        Booking Details
      </h1>
      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="bg-[#B17457] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Room Number</th>
              <th className="px-4 py-2 text-left">Check-In Date</th>
              <th className="px-4 py-2 text-left">Check-Out Date</th>
              <th className="px-4 py-2 text-left">Total Price</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{booking.roomNumber}</td>
                <td className="px-4 py-2">
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">${booking.totalPrice}</td>
                <td className="px-4 py-2">{booking.status}</td>
                <td className="px-4 py-2">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{booking.notes || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBooking;
