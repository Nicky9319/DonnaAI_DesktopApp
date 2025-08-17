import React from 'react'
import FloatingWidget from '../../floatingWidget/FloatingWidget'
import ActionBar from '../../actionBar/ActionBar'
import ChatInterface from './DropdownModal'

const MainPage = () => {
  return (
    <>
      <FloatingWidget />
      <ActionBar />
      <ChatInterface />
    </>
  );
};

export default MainPage
