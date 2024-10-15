// src/pages/Register.jsx
import React, { useState } from 'react';
import Step1 from '../FormSteps/Step1';
import Step2 from '../FormSteps/Step2';
import Step3 from '../FormSteps/Step3';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      {step === 1 && (
        <Step1 nextStep={nextStep} setFormData={setFormData} formData={formData} />
      )}
      {step === 2 && (
        <Step2
          nextStep={nextStep}
          prevStep={prevStep}
          setFormData={setFormData}
          formData={formData}
        />
      )}
      {step === 3 && (
        <Step3 prevStep={prevStep} formData={formData} />
      )}
    </div>
  );
};

export default Register;
