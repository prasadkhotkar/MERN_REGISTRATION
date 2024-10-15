import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Step3 = ({ prevStep, formData }) => {
  const { register } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('address', formData.address);
    data.append('phoneNumber', formData.phoneNumber);
    if (profilePicture) {
      data.append('profilePicture', profilePicture);
    }

    const response = await register(data);
    if (response.success) {
      setSubmissionStatus('Registration successful!');
      // Redirect to dashboard or login
      window.location.href = '/dashboard';
    } else {
      setSubmissionStatus(response.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Review Information</h2>
      <div>
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Address:</strong> {formData.address}
        </p>
        <p>
          <strong>Phone Number:</strong> {formData.phoneNumber}
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
        <p className="text-red-500 text-sm">{submissionStatus}</p>
      )}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Step3;
