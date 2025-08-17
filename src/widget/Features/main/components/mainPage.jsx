import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FloatingWidget from '../../floatingWidget/FloatingWidget'
import ActionBar from '../../actionBar/ActionBar'
import ChatInterface from '../../chatInterface/ChatInterface'

const MainPage = () => {
  const { floatingWidgetVisible, actionBarVisible, chatInterfaceVisible } = useSelector(
    (state) => state.uiVisibility
  );

  // Local state to handle smooth transitions
  const [localVisibility, setLocalVisibility] = useState({
    floatingWidget: floatingWidgetVisible,
    actionBar: actionBarVisible,
    chatInterface: chatInterfaceVisible
  });

  // useEffect to handle visibility state changes with smooth transitions
  useEffect(() => {
    const timeoutIds = [];

    // Handle floating widget visibility
    if (floatingWidgetVisible !== localVisibility.floatingWidget) {
      if (floatingWidgetVisible) {
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

    // Handle action bar visibility
    if (actionBarVisible !== localVisibility.actionBar) {
      if (actionBarVisible) {
        setLocalVisibility(prev => ({ ...prev, actionBar: true }));
      } else {
        const timeoutId = setTimeout(() => {
          setLocalVisibility(prev => ({ ...prev, actionBar: false }));
        }, 300);
        timeoutIds.push(timeoutId);
      }
    }

    // Handle chat interface visibility
    if (chatInterfaceVisible !== localVisibility.chatInterface) {
      if (chatInterfaceVisible) {
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
  }, [floatingWidgetVisible, actionBarVisible, chatInterfaceVisible, localVisibility]);

  return (
    <>
      {localVisibility.floatingWidget && (
        <div style={{
          opacity: floatingWidgetVisible ? 1 : 0,
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: floatingWidgetVisible ? 'scale(1)' : 'scale(0.95)',
          transitionProperty: 'opacity, transform'
        }}>
          <FloatingWidget />
        </div>
      )}
      
      {localVisibility.actionBar && (
        <div style={{
          opacity: actionBarVisible ? 1 : 0,
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: actionBarVisible ? 'translateY(0)' : 'translateY(-10px)',
          transitionProperty: 'opacity, transform'
        }}>
          <ActionBar />
        </div>
      )}
      
      {localVisibility.chatInterface && (
        <div style={{
          opacity: chatInterfaceVisible ? 1 : 0,
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: chatInterfaceVisible ? 'scale(1)' : 'scale(0.98)',
          transitionProperty: 'opacity, transform'
        }}>
          <ChatInterface />
        </div>
      )}
    </>
  );
};

export default MainPage
