// src/pages/Dashboard.jsx
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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
      {userData ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            {userData.profilePicture ? (
              <img
                src={userData.profilePicture}
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xl font-semibold">
                  {userData.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold">{userData.name}</h3>
              <p className="text-gray-600">{userData.email}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Address:</h4>
            <p>{userData.address}</p>
          </div>
          <div>
            <h4 className="font-semibold">Phone Number:</h4>
            <p>{userData.phoneNumber}</p>
          </div>
          <Link
            to="/edit-profile"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Edit Profile
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
