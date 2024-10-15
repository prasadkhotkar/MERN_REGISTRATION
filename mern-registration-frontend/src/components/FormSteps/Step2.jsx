import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Step2 = ({ nextStep, prevStep, setFormData, formData }) => {
  const schema = yup.object().shape({
    address: yup.string().required('Address is required'),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .matches(
        /^[0-9]{10}$/,
        'Phone number must be exactly 10 digits'
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      address: formData.address || '',
      phoneNumber: formData.phoneNumber || '',
    },
  });

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-semibold">Profile Information</h2>
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
        <p className="text-red-500 text-sm">{errors.phoneNumber?.message}</p>
      </div>
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
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step2;
