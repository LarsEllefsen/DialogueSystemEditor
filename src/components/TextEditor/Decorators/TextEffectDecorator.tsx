import React, { useState } from 'react';
import { CompositeDecorator, Entity } from 'draft-js';
import { Popover } from '../../Popover/Popover';

export const TextEffectEntityComponent = (props) => {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const editEntity = () => (
    <div>
      <h2>This is a popover</h2>
      <p>Its very classy</p>
    </div>
  );

  const entity = props.contentState.getEntity(props.entityKey).getData();
  // console.log(entity);

  const getStyle = () => {
    const styles = {};
    if (entity.color) {
      styles.background = entity.color;
    }
    return styles;
  };

  return (
    <span className="border border-black cursor-pointer p-1  rounded-md" style={getStyle()}>
      {props.children}
      <Popover open={popoverOpen}>{editEntity()}</Popover>
    </span>
  );
};

function findPlaceholders(contentBlock, callback) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null
            && Entity.get(entityKey).getType() === 'FX'
    );
  }, callback);
}

export const TextEffectDecorator = new CompositeDecorator([{
  strategy: findPlaceholders,
  component: TextEffectEntityComponent,
}]);
