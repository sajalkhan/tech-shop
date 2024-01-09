import React from 'react';
import Typewriter from 'typewriter-effect';

interface TypeWriterProps {
  text: string[];
}

const TypeWriter: React.FC<TypeWriterProps> = ({ text }) => (
  <Typewriter
    options={{
      strings: text,
      autoStart: true,
      loop: true,
    }}
  />
);

export default TypeWriter;
