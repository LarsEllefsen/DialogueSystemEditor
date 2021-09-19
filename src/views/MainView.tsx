import React, { useState } from 'react';
import { Header } from '../components/Header/Header';
import { EditorView } from './EditorView';

export const MainView = () => {
  const [test, setTest] = useState();

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <EditorView />
      </div>
    </>
  );
};
