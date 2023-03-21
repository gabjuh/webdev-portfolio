import React, { useState, useEffect } from 'react';

interface IPrompt {
  prompt: string | null;
  activeField: number | null;
}

const Prompt: React.FC<IPrompt> = ({ prompt, activeField }) => {

  const [writtenPrompt, setWrittenPrompt] = useState<string>('');
  const [propmtBuffer, setPromptBuffer] = useState<string | null>('');

  const generateRandomInterval = () => Math.floor(Math.random() * 30);

  // This function will write to the prompt every 50 to 150 milliseconds
  const writePrompt = () =>
    setInterval(() => {
      // if prompt isn't fully written and promptIsWritten false, add a letter
      if (prompt && writtenPrompt.length < prompt.length) {
        setWrittenPrompt(prompt.slice(0, writtenPrompt.length + 1));
      }
    }, generateRandomInterval());

  // This function clears the prompt backwards, one character at a time, 
  // by slicing off the last character of the prompt.
  const clearProptBackwards = () =>
    setInterval(() => {
      if (propmtBuffer && writtenPrompt.length > 0) {
        setWrittenPrompt(propmtBuffer.slice(0, writtenPrompt.length - 1));
      }
    }, generateRandomInterval());

  const blinkCursor = () => {
    const cursor = document.getElementById('cursor');
    if (cursor) {
      cursor.classList.toggle('opacity-0');
    }
  };

  // Save the prompt to a buffer when the activeField changes and the prompt is not null
  useEffect(() => {
    if (activeField !== null && prompt) {
      setPromptBuffer(prompt);
    }
  }, [activeField]);

  // write the complete prompt if selected field is not null
  useEffect(() => {
    if (activeField !== null) {
      const interval = writePrompt();
      return () => clearInterval(interval);
    }
    // clear the prompt if selected field is null
    if (activeField === null) {
      const interval = clearProptBackwards();
      return () => clearInterval(interval);
    }
  });

  // This code blinks a cursor on the screen at a rate of 500ms.
  useEffect(() => {
    const interval = setInterval(() => {
      blinkCursor();
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="invisible md:visible p-2 font-mono w-[200px] mx-auto text-xl -translate-y-[40px] lg:-translate-x-[130px] text-center">
        <p className="h-[2rem] text-[#0b7878]">
          {writtenPrompt}
          {writtenPrompt.length > -1 && <span id="cursor">_</span>}
        </p>
      </div>
    </>
  );
};


export default Prompt;