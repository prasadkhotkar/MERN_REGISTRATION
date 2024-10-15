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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Register</h2>
        
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 mx-auto h-1 bg-gray-300 rounded-full overflow-hidden">
            <div
              className={`h-full bg-blue-500 transition-all duration-500 ease-in-out ${
                step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'
              }`}
            ></div>
          </div>
        </div>

        <div className="pt-6">
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
          {step === 3 && <Step3 prevStep={prevStep} formData={formData} />}
        </div>
      </div>
    </div>
  );
};

export default Register;
