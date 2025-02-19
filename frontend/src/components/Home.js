import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/components/home"
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto p-8 max-w-screen-md mt-20">
      <div className="bg-white shadow-md rounded-md p-6">
        <h3 className="text-2xl font-bold mb-4">Attendance Records</h3>
        <table className="w-full border">
          <thead className="">
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2"> Registration Number</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone Number</th>
              <th className="border p-2">Entered At</th>
            </tr>
          </thead>
          <tr>
            <td className="border p-2">Savidya Induma</td>
            <td className="border p-2">EUSL/TC/IS/2018/COM/32</td>
            <td className="border p-2">savidyainduma@gmail.com</td>
            <td className="border p-2">0788272785</td>
            <td className="border p-2">6.45 PM</td>
          </tr>

          <tr>
            <td className="border p-2">Janith Pasindu</td>
            <td className="border p-2">EUSL/TC/IS/2018/COM/41</td>
            <td className="border p-2">janithp99@gmail.com</td>
            <td className="border p-2">0767689212</td>
            <td className="border p-2">6.45 PM</td>
          </tr>

          <tr>
            <td className="border p-2">Supun Buddika</td>
            <td className="border p-2">EUSL/TC/IS/2018/COM/90</td>
            <td className="border p-2">supunbb96@gmail.com</td>
            <td className="border p-2">0712398765</td>
            <td className="border p-2">6.00 PM</td>
          </tr>
          <tbody></tbody>
        </table>
        <p> </p>
        <div className="flex justify-center items-center">
          <Link
            to="/front"
            className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Home;

//{userData.map((user) => (
// className='border' key={user.id}

//))}
//<p className='mt-4'>Not a member? <a className='text-blue-500' href='/signup'>Create Account</a> from here. </p>
