import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Step1 = ({ nextStep, setFormData, formData }) => {
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(/[a-z]/, 'Password must have at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must have at least one uppercase letter')
      .matches(/\d/, 'Password must have at least one number')
      .matches(
        /[@$!%*?&#]/,
        'Password must have at least one special character'
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: formData.name || '',
      email: formData.email || '',
      password: formData.password || '',
    },
  });

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-semibold">Basic Information</h2>
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
        <label className="block">Password</label>
        <input
          type="password"
          {...register('password')}
          className="w-full p-2 border rounded"
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Next
      </button>
    </form>
  );
};

export default Step1;
