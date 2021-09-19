import React from 'react';

export interface PopoverProps {
    open: boolean;
    children?: React.ReactNode;
}

export const Popover = ({ open, children }:PopoverProps) => {
  if (open) return <div className="absolute">{children}</div>;
  return <></>;
};
