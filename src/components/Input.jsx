import React, { useState, useRef, useEffect } from 'react';

const EmailTemplateEditor = ({ initialBody, placeholders }) => {
  const [body, setBody] = useState(initialBody);
  const editorRef = useRef(null);

  // Function to insert a placeholder at the cursor position
  const insertPlaceholder = (placeholder) => {
    const editor = editorRef.current;
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const newNode = document.createElement('span');
    newNode.className =
      'bg-gray-200 text-blue-500 rounded px-1 mx-1 inline-flex items-center';
    newNode.contentEditable = 'false';
    newNode.innerHTML = `{${placeholder}} <span class="ml-1 cursor-pointer text-red-500" onClick="this.parentNode.remove();">x</span>`;

    range.insertNode(newNode);
    range.setStartAfter(newNode);
    range.setEndAfter(newNode);
    selection.removeAllRanges();
    selection.addRange(range);

    setBody(editor.innerHTML);
    editor.focus();
  };

  // Convert existing placeholders in the initial body to interactive elements
  const convertPlaceholdersToInteractive = (content) => {
    return content.replace(/\{(.*?)\}/g, (match, p1) => {
      return `<span class='bg-gray-200 text-blue-500 rounded px-1 mx-1 inline-flex items-center' contentEditable='false'>{${p1}} <span class="ml-1 cursor-pointer text-red-500" onClick="this.parentNode.remove();">x</span></span>`;
    });
  };

  // Function to handle input changes
  const handleInputChange = () => {
    setBody(editorRef.current.innerHTML);
  };

  // Store cursor position and restore it after re-render
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      return range;
    }
    return null;
  };

  const restoreSelection = (range) => {
    if (range) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleKeyUp = () => {
    const range = saveSelection();
    setBody(editorRef.current.innerHTML);
    setTimeout(() => restoreSelection(range), 0);
  };

  // Convert initial body placeholders to interactive on mount
  useEffect(() => {
    const editor = editorRef.current;
    editor.innerHTML = convertPlaceholdersToInteractive(initialBody);
    setBody(editor.innerHTML);
  }, [initialBody]);

  return (
    <div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInputChange}
        onKeyUp={handleKeyUp}
        className='w-full p-2 border rounded whitespace-pre-wrap'
        style={{ minHeight: '150px' }}
      />

      <div className='mt-4'>
        {placeholders.map((placeholder) => (
          <button
            key={placeholder}
            onClick={() => insertPlaceholder(placeholder)}
            className='mr-2 p-2 bg-blue-500 text-white rounded'
          >
            Add {placeholder}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmailTemplateEditor;
