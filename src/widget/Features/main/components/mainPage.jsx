import React from 'react'
import { useSelector } from 'react-redux'
import FloatingWidget from '../../floatingWidget/FloatingWidget'
import ActionBar from '../../actionBar/ActionBar'
import ChatInterface from '../../chatInterface/ChatInterface'

const MainPage = () => {
  const { floatingWidgetVisible, actionBarVisible, chatInterfaceVisible } = useSelector(
    (state) => state.uiVisibility
  );

  return (
    <>
      {floatingWidgetVisible && <FloatingWidget />}
      {actionBarVisible && <ActionBar />}
      {chatInterfaceVisible && <ChatInterface />}
    </>
  );
};

export default MainPage
