import React, { useState } from 'react';

export interface TextEffectPaneProps {
    initialText?: string;
    onSubmit: (payload: TextEffectState) => any;
}

export interface TextEffectState {
    text: string;
    effectType: string;
    color: string;
}

export const TextEffectPane = ({ initialText, onSubmit }: TextEffectPaneProps) => {
  const [currentText, setCurrentText] = useState<string>(initialText);
  const [effectType, setEffectType] = useState<string>('WAVE');
  const [color, setColor] = useState<string>('');

  const handleTextChange = (e) => {
    setCurrentText(e.target.value);
  };

  const handleSelectChange = (e) => {
    console.log(e.target.value);
    setEffectType(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const constructPayload = () => {
    const payload : TextEffectState = {} as TextEffectState;
    payload.text = currentText;
    payload.effectType = effectType;
    payload.color = color;
    return payload;
  };

  return (
    <div id="texteditor-fx" className="border border-black">
      <form className="flex">
        <div className="flex flex-col">
          <label htmlFor="fx-text-input">Text</label>
          <input className="border" name="text-value" id="text" type="text-input" value={currentText} onChange={handleTextChange} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="fx-type-select">Effect type</label>
          <select id="fx-type-select" onChange={handleSelectChange} defaultValue="WAVE">
            <option value="WAVE">Wave</option>
            <option value="REPLACEME">Another effect</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="fx-text-color">Text color</label>
          <input className="border" name="text-value" type="text" id="fx-text-color" value={color} onChange={handleColorChange} />
        </div>
        <button type="submit" onClick={() => onSubmit(constructPayload())}>Ok</button>
      </form>
    </div>
  );
};
