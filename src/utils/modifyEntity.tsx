import {
  ContentState, EditorState, SelectionState, ContentBlock, Modifier,
} from 'draft-js';

export function findCurrentEntityByOffset(contentState : ContentState, key: string, offset: number) {
  let entityKey = null;
  contentState.getBlocksAsArray().forEach((block : ContentBlock) => {
    if (block.getKey() === key) {
      entityKey = block.getEntityAt(offset);
    }
  });

  return entityKey;
}

export function modifyEntity(editorState: EditorState) {
  const selectionState : SelectionState = editorState.getSelection();
  const contentState : ContentState = editorState.getCurrentContent();

  const startOffset = selectionState.getStartOffset();
  const currentKey = selectionState.getStartKey();
  const currentEntityKey = findCurrentEntityByOffset(contentState, currentKey, startOffset);

  const currentEntity = currentEntityKey !== null ? contentState.getEntity(currentEntityKey) : null;

  if (currentEntity !== null) {
    const modifiedState : ContentState = Modifier.applyEntity(
      contentState, selectionState, currentEntityKey,
    );
    return modifiedState;
  }

  return null;
}
