import React, { useState } from 'react';

interface EditorButtonProps {
    text: string;
    onClick: () => void;
}

export const EditorButton = ({ text, onClick }: EditorButtonProps) => {
  const [toggled, setToggled] = useState<boolean>(false);
  return (
    <button type="button" className="py-2 px-4 border border-black" onClick={onClick}>{text}</button>
  );
};
