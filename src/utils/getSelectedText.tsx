import { EditorState } from 'draft-js';

export function getSelectedText(editorState: EditorState) {
  // Get block for current selection
  const selection = editorState.getSelection();
  const anchorKey = selection.getAnchorKey();
  const currentContent = editorState.getCurrentContent();
  const currentBlock = currentContent.getBlockForKey(anchorKey);

  // Then based on the docs for SelectionState -
  const start = selection.getStartOffset();
  const end = selection.getEndOffset();
  const selectedText = currentBlock.getText().slice(start, end);

  return selectedText;
}
