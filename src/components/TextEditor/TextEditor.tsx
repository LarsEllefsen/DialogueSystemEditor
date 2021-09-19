import React, { useState } from 'react';
import {
  convertToRaw, Editor, EditorState, RichUtils, Modifier, ContentState,
} from 'draft-js';
import { EditorButton } from './EditorButton';
import { TextEffectDecorator } from './Decorators/TextEffectDecorator';
import { getSelectedText } from '../../utils/getSelectedText';
import 'draft-js/dist/Draft.css';
import { TextEffectPane, TextEffectState } from './TextEffectPane';
import { modifyEntity } from '../../utils/modifyEntity';

export const TextEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    () => EditorState.createEmpty(TextEffectDecorator),
  );
  const [textEffectPaneOpen, setTextEffectPaneOpen] = useState<boolean>(false);
  const [textEffectPaneInitialText, setTextEffectPaneInitialText] = useState<string>();

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onFXClick = () => {
    const selectedText = getSelectedText(editorState);
    setTextEffectPaneInitialText(selectedText);
    setTextEffectPaneOpen(!textEffectPaneOpen);
  };

  const createTextEffectEntity = (payload: TextEffectState) => {
    const contentState = editorState.getCurrentContent();
    const selectionRange = editorState.getSelection();
    const contentStateWithEntity = contentState.createEntity('FX', 'MUTABLE', {
      type: payload.effectType,
      color: payload.color,
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let modifiedContentState: ContentState;
    if (selectionRange.isCollapsed()) {
      modifiedContentState = Modifier.insertText(
        contentStateWithEntity,
        selectionRange,
        payload.text,
        null,
        entityKey,
      );
    } else {
      modifiedContentState = Modifier.replaceText(
        contentStateWithEntity,
        selectionRange,
        payload.text,
        null,
        entityKey,
      );
    }
    const newEditorState = EditorState.set(editorState, {
      currentContent: modifiedContentState,
      decorator: TextEffectDecorator,
    });
    setEditorState(newEditorState);
    setTextEffectPaneOpen(false);
  };

  const handleEditorChange = (editorState : EditorState) => {
    let newEditorState = editorState;
    const modifiedState = modifyEntity(editorState);
    if (modifiedState != null) {
      newEditorState = EditorState.set(editorState, {
        currentContent: modifiedState,
        decorator: TextEffectDecorator,
      });
    }
    setEditorState(newEditorState);
  };

  return (
    <div className="border" id="texteditor">
      <div id="texteditor-toolbar">
        <EditorButton text="B" onClick={onBoldClick} />
        <EditorButton text="FX" onClick={onFXClick} />
        <EditorButton text="Test" onClick={() => console.log(convertToRaw(editorState.getCurrentContent()))} />
      </div>
      {textEffectPaneOpen && (
      <TextEffectPane
        initialText={textEffectPaneInitialText}
        onSubmit={createTextEffectEntity}
      />
      )}
      <div className="border border-black h-24 overflow-y-auto p-4" id="texteditor-editor-wrapper">
        <Editor editorState={editorState} onChange={handleEditorChange} />
      </div>
    </div>
  );
};
