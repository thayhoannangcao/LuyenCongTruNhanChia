import React, { useState } from 'react';
import TextInput from './TextInput';

const TextInputCanClear = () => {
  const [input, setInput] = useState('');
  return (
    <div className="h-24 p-6">
      <TextInput
        label="Label"
        placeholder="Placeholder"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onClear={() => {
          setInput('');
        }}
      />
    </div>
  );
};

export default TextInputCanClear;
