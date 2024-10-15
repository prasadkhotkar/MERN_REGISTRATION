// src/pages/EditProfile.jsx
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
      // Optionally, redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      setSubmissionStatus(response.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      {userData ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block">Name</label>
            <input
              type="text"
              {...register('name')}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>
          <div>
            <label className="block">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <div>
            <label className="block">Address</label>
            <input
              type="text"
              {...register('address')}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500 text-sm">{errors.address?.message}</p>
          </div>
          <div>
            <label className="block">Phone Number</label>
            <input
              type="text"
              {...register('phoneNumber')}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500 text-sm">
              {errors.phoneNumber?.message}
            </p>
          </div>
          <div>
            <label className="block">Profile Picture (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
          </div>
          {submissionStatus && (
            <p
              className={`text-sm ${
                submissionStatus.includes('successfully')
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {submissionStatus}
            </p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update Profile
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditProfile;
