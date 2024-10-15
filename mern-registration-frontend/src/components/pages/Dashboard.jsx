import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import API from '../services/api';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await API.get(`/user/${user._id}`);
      setUserData(response.data);
    };
    fetchUser();
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto mt-16 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <button
          onClick={logout}
          className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
      {userData ? (
        <div className="space-y-8">
          <div className="flex items-center space-x-6">
            {userData.profilePicture ? (
              <img
                src={userData.profilePicture}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-blue-500 object-cover shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold">
                  {userData.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {userData.name}
              </h3>
              <p className="text-gray-500">{userData.email}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700">Address:</h4>
                <p className="text-gray-600">{userData.address}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Phone Number:</h4>
                <p className="text-gray-600">{userData.phoneNumber}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              to="/edit-profile"
              className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
