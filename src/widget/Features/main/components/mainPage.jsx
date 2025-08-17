import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FloatingWidget from '../../floatingWidget/FloatingWidget'
import ActionBar from '../../actionBar/ActionBar'
import ChatInterface from '../../chatInterface/ChatInterface'

const MainPage = () => {
  const { floatingWidgetVisible, actionBarVisible, chatInterfaceVisible, allWidgetsVisible } = useSelector(
    (state) => state.uiVisibility
  );

  // Local state to handle smooth transitions
  const [localVisibility, setLocalVisibility] = useState({
    floatingWidget: floatingWidgetVisible && allWidgetsVisible,
    actionBar: actionBarVisible && allWidgetsVisible,
    chatInterface: chatInterfaceVisible && allWidgetsVisible
  });

  // useEffect to handle visibility state changes with smooth transitions
  useEffect(() => {
    const timeoutIds = [];

    // Handle floating widget visibility (considering both individual and global state)
    const shouldShowFloatingWidget = floatingWidgetVisible && allWidgetsVisible;
    if (shouldShowFloatingWidget !== localVisibility.floatingWidget) {
      if (shouldShowFloatingWidget) {
        // Show immediately
        setLocalVisibility(prev => ({ ...prev, floatingWidget: true }));
      } else {
        // Hide with delay for smooth transition
        const timeoutId = setTimeout(() => {
          setLocalVisibility(prev => ({ ...prev, floatingWidget: false }));
        }, 300); // Match the transition duration
        timeoutIds.push(timeoutId);
      }
    }

    // Handle action bar visibility (considering both individual and global state)
    const shouldShowActionBar = actionBarVisible && allWidgetsVisible;
    if (shouldShowActionBar !== localVisibility.actionBar) {
      if (shouldShowActionBar) {
        setLocalVisibility(prev => ({ ...prev, actionBar: true }));
      } else {
        const timeoutId = setTimeout(() => {
          setLocalVisibility(prev => ({ ...prev, actionBar: false }));
        }, 300);
        timeoutIds.push(timeoutId);
      }
    }

    // Handle chat interface visibility (considering both individual and global state)
    const shouldShowChatInterface = chatInterfaceVisible && allWidgetsVisible;
    if (shouldShowChatInterface !== localVisibility.chatInterface) {
      if (shouldShowChatInterface) {
        setLocalVisibility(prev => ({ ...prev, chatInterface: true }));
      } else {
        const timeoutId = setTimeout(() => {
          setLocalVisibility(prev => ({ ...prev, chatInterface: false }));
        }, 300);
        timeoutIds.push(timeoutId);
      }
    }

    // Cleanup timeouts on unmount or state change
    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [floatingWidgetVisible, actionBarVisible, chatInterfaceVisible, allWidgetsVisible, localVisibility]);

  return (
    <>
      {/* Dummy transparent screen that covers the whole browser window when all widgets are hidden */}
      {!allWidgetsVisible && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'transparent',
          zIndex: 1, // Low z-index to stay behind other widgets
          pointerEvents: 'none' // Allow clicks to pass through
        }} />
      )}
      
      {localVisibility.floatingWidget && (
        <div style={{
          opacity: (floatingWidgetVisible && allWidgetsVisible) ? 1 : 0,
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: (floatingWidgetVisible && allWidgetsVisible) ? 'scale(1)' : 'scale(0.95)',
          transitionProperty: 'opacity, transform',
          pointerEvents: (floatingWidgetVisible && allWidgetsVisible) ? 'auto' : 'none'
        }}>
          <FloatingWidget />
        </div>
      )}
      
      {localVisibility.actionBar && (
        <div style={{
          opacity: (actionBarVisible && allWidgetsVisible) ? 1 : 0,
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: (actionBarVisible && allWidgetsVisible) ? 'translateY(0)' : 'translateY(-10px)',
          transitionProperty: 'opacity, transform',
          pointerEvents: (actionBarVisible && allWidgetsVisible) ? 'auto' : 'none'
        }}>
          <ActionBar />
        </div>
      )}
      
      {localVisibility.chatInterface && (
        <div style={{
          opacity: (chatInterfaceVisible && allWidgetsVisible) ? 1 : 0,
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: (chatInterfaceVisible && allWidgetsVisible) ? 'scale(1)' : 'scale(0.98)',
          transitionProperty: 'opacity, transform',
          pointerEvents: (chatInterfaceVisible && allWidgetsVisible) ? 'auto' : 'none'
        }}>
          <ChatInterface />
        </div>
      )}
    </>
  );
};

export default MainPage
