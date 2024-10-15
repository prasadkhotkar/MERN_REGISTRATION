import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const EditProfile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [userData, setUserData] = useState(null);

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    address: yup.string().required('Address is required'),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await API.get(`/user/${user._id}`);
      setUserData(response.data);
      setValue('name', response.data.name);
      setValue('email', response.data.email);
      setValue('address', response.data.address);
      setValue('phoneNumber', response.data.phoneNumber);
    };
    fetchUser();
  }, [user, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('address', data.address);
    formData.append('phoneNumber', data.phoneNumber);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    const response = await updateProfile(user._id, formData);
    if (response.success) {
      setSubmissionStatus('Profile updated successfully!');
      window.location.href = '/dashboard';
    } else {
      setSubmissionStatus(response.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Edit Profile
      </h2>
      {userData ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              {...register('name')}
              className={`w-full p-3 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-blue-500`}
            />
            <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              className={`w-full p-3 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-blue-500`}
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Address
            </label>
            <input
              type="text"
              {...register('address')}
              className={`w-full p-3 border ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-blue-500`}
            />
            <p className="text-red-500 text-sm mt-1">{errors.address?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="text"
              {...register('phoneNumber')}
              className={`w-full p-3 border ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-blue-500`}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber?.message}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Profile Picture (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {submissionStatus && (
            <p
              className={`text-sm ${
                submissionStatus.includes('successfully')
                  ? 'text-green-500'
                  : 'text-red-500'
              } text-center`}
            >
              {submissionStatus}
            </p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            Update Profile
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default EditProfile;
