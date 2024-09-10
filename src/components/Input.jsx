import React, { useState, useRef } from 'react';

const DynamicInput = ({ firstName, lastName, challengeName }) => {
  const initialText = `Hello {first_name} {last_name}, you have been invited to {challenge_name}`;

  const [content, setContent] = useState(initialText);
  const [placeholders, setPlaceholders] = useState({
    first_name: true,
    last_name: true,
    challenge_name: true,
  });
  const contentRef = useRef(null);

  // Preserve caret position and set it back
  const setCaretPosition = (el, position) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(el.childNodes[0], position);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const getCaretPosition = (el) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return 0;
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(el);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    return preCaretRange.toString().length;
  };

  const togglePlaceholder = (placeholder) => {
    const inputElement = contentRef.current;
    const caretPos = getCaretPosition(inputElement); // Get caret position before making changes

    const placeholderText = `{${placeholder}}`;
    const currentContent = contentRef.current.innerText;

    if (placeholders[placeholder]) {
      // Remove the placeholder
      setPlaceholders((prev) => ({
        ...prev,
        [placeholder]: false,
      }));
      setContent(currentContent.replace(placeholderText, ''));
    } else {
      // Add the placeholder at the caret position
      const updatedContent = [
        currentContent.slice(0, caretPos),
        placeholderText,
        currentContent.slice(caretPos),
      ].join('');
      setContent(updatedContent);
      setPlaceholders((prev) => ({
        ...prev,
        [placeholder]: true,
      }));
      setCaretPosition(contentRef.current, caretPos + placeholderText.length); // Move the caret after the inserted placeholder
    }
  };

  const handleInputChange = () => {
    setContent(contentRef.current.innerText); // Update the content state after typing
  };

  const renderContent = () => {
    const parts = content.split(/(\{[a-z_]+\})/g); // Split the content by placeholders

    return parts.map((part, index) => {
      if (part.match(/\{[a-z_]+\}/)) {
        // If it's a placeholder
        return (
          <span
            key={index}
            contentEditable={false}
            className='bg-gray-200 px-1 rounded cursor-pointer mx-1'
          >
            {part}
          </span>
        );
      } else {
        // Regular text
        return <span key={index}>{part}</span>;
      }
    });
  };

  return (
    <div className='p-4'>
      <div
        ref={contentRef}
        className='border p-2 w-full'
        contentEditable
        onInput={handleInputChange}
        suppressContentEditableWarning={true}
      >
        {renderContent()}
      </div>
      <div className='flex gap-2 mt-2'>
        {/* Toggle first_name */}
        <button
          className={`flex items-center ${
            placeholders.first_name ? 'bg-blue-500' : 'bg-gray-400'
          } text-white px-3 py-1 rounded`}
          onClick={() => togglePlaceholder('first_name')}
        >
          {firstName}
          <span className='ml-2'>{placeholders.first_name ? '✕' : '➕'}</span>
        </button>

        {/* Toggle last_name */}
        <button
          className={`flex items-center ${
            placeholders.last_name ? 'bg-green-500' : 'bg-gray-400'
          } text-white px-3 py-1 rounded`}
          onClick={() => togglePlaceholder('last_name')}
        >
          {lastName}
          <span className='ml-2'>{placeholders.last_name ? '✕' : '➕'}</span>
        </button>

        {/* Toggle challenge_name */}
        <button
          className={`flex items-center ${
            placeholders.challenge_name ? 'bg-red-500' : 'bg-gray-400'
          } text-white px-3 py-1 rounded`}
          onClick={() => togglePlaceholder('challenge_name')}
        >
          {challengeName}
          <span className='ml-2'>
            {placeholders.challenge_name ? '✕' : '➕'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default DynamicInput;
