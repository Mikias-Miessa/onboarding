import React from 'react';
import { FaCheck } from 'react-icons/fa'; // For the check icon

const ProgressIndicator = ({ currentStep, steps }) => {
  return (
    <div className='w-full max-w-xl mx-auto flex flex-col items-center px-2'>
      <div className='w-[80%] flex justify-center'>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className='flex flex-col items-center'>
              {/* Step Circle */}
              <div
                className={`relative w-5 h-5 rounded-full flex items-center justify-center ${
                  currentStep > step.id
                    ? 'bg-[#7F56D9]' // Completed step
                    : currentStep === step.id
                    ? 'bg-[#fff] border-2 border-[#7F56D9]/60' // Current step
                    : 'bg-gray-200' // Upcoming step
                }`}
              >
                {/* Completed step: white tick */}
                {currentStep > step.id && (
                  <FaCheck size={10} className='text-white' />
                )}

                {/* Current step: white circle inside */}
                {currentStep === step.id && (
                  <div className='w-4 h-4 bg-[#7F56D9] rounded-full flex justify-center items-center'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                )}

                {/* Upcoming step: darker circle inside */}
                {currentStep < step.id && (
                  <div className='w-2 h-2 bg-gray-300 rounded-full'></div>
                )}
              </div>

              {/* Title and Description */}
            </div>

            {/* Line connecting the steps */}
            {index < steps.length - 1 && (
              <div
                className={`h-[2px] md:w-44 w-28 mt-2 ${
                  currentStep > step.id ? 'bg-[#7F56D9]' : 'bg-gray-300'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className='flex md:gap-12 gap-4 '>
        {steps.map((step) => (
          <div
            key={step.id}
            className='mt-2 flex flex-col items-center text-center justify-center'
          >
            <p className='text-xs text-[#7F56D9] font-semibold'>{step.title}</p>
            <p className='text-[10px] text-gray-500'>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
