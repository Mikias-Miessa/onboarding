import React, { useState } from 'react';

const initialTemplate = [
  'Hello ',
  '{first_name}',
  ' ',
  '{last_name}',
  ', you are invited to ',
  '{challenge_name}',
];

const EmailTemplateEditor = () => {
  const [template, setTemplate] = useState(initialTemplate);

  // Function to update non-placeholder text
  const handleTextChange = (e, index) => {
    const updatedTemplate = [...template];
    updatedTemplate[index] = e.target.value;
    setTemplate(updatedTemplate);
  };

  // Add placeholder
  const addPlaceholder = (placeholder) => {
    setTemplate([...template, `{${placeholder}}`]);
  };

  // Remove placeholder
  const removePlaceholder = (index) => {
    const updatedTemplate = template.filter((_, i) => i !== index);
    setTemplate(updatedTemplate);
  };

  return (
    <div className='p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4'>Edit Email Template</h2>

      {/* Render template as input and span elements */}
      <div className='border p-4 rounded bg-gray-100'>
        {template.map((segment, index) => {
          // Render placeholders
          if (segment.startsWith('{') && segment.endsWith('}')) {
            return (
              <span
                key={index}
                className='bg-gray-200 text-gray-600 rounded px-1 mx-1'
              >
                {segment}
                <button
                  onClick={() => removePlaceholder(index)}
                  className='ml-2 text-red-500'
                >
                  &times;
                </button>
              </span>
            );
          }

          // Render editable text
          return (
            <input
              key={index}
              type='text'
              value={segment}
              onChange={(e) => handleTextChange(e, index)}
              className='border-none bg-transparent outline-none'
            />
          );
        })}
      </div>

      {/* Buttons to add placeholders */}
      <div className='mt-4 space-x-2'>
        <button
          className='bg-blue-500 text-white py-1 px-3 rounded'
          onClick={() => addPlaceholder('first_name')}
        >
          Add First Name
        </button>
        <button
          className='bg-blue-500 text-white py-1 px-3 rounded'
          onClick={() => addPlaceholder('last_name')}
        >
          Add Last Name
        </button>
        <button
          className='bg-blue-500 text-white py-1 px-3 rounded'
          onClick={() => addPlaceholder('challenge_name')}
        >
          Add Challenge Name
        </button>
      </div>
    </div>
  );
};

export default EmailTemplateEditor;
