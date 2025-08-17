import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementMessageCount, clearMessageCount } from '../../store/uiVisibilitySlice'
import { themeColors } from '../../common/utils/colors'
import FloatingWidget from '../../floatingWidget/FloatingWidget'
import ActionBar from '../../actionBar/ActionBar'
import ChatInterface from '../../chatInterface/ChatInterface'

const MainPage = () => {
  const dispatch = useDispatch();
  const { floatingWidgetVisible, actionBarVisible, chatInterfaceVisible, allWidgetsVisible, messageCount } = useSelector(
    (state) => state.uiVisibility
  );

  // Local state to handle smooth transitions
  const [localVisibility, setLocalVisibility] = useState({
    floatingWidget: floatingWidgetVisible && allWidgetsVisible,
    actionBar: actionBarVisible && allWidgetsVisible,
    chatInterface: chatInterfaceVisible && allWidgetsVisible
  });

  // Handle click-through based on allWidgetsVisible state
  useEffect(() => {
    if (window.widgetAPI) {
      if (!allWidgetsVisible) {
        // Enable click-through when all widgets are hidden
        window.widgetAPI.enableClickThrough();
        console.log('Click-through enabled - all widgets hidden');
      } else {
        // Disable click-through when widgets are visible
        window.widgetAPI.disableClickThrough();
        console.log('Click-through disabled - widgets visible');
      }
    }
  }, [allWidgetsVisible]);

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
      {/* Test Controls for Notification Badge */}
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        zIndex: 9999,
        backgroundColor: themeColors.modalBackground,
        padding: '10px',
        borderRadius: '8px',
        color: themeColors.primaryText,
        fontSize: '12px',
        border: `1px solid ${themeColors.borderColor}`
      }}>
        <div>Message Count: {messageCount}</div>
        <button 
          onClick={() => dispatch(incrementMessageCount())}
          style={{
            margin: '5px',
            padding: '5px 10px',
            backgroundColor: themeColors.primaryBlue,
            color: themeColors.primaryText,
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = themeColors.hoverBackground}
          onMouseLeave={(e) => e.target.style.backgroundColor = themeColors.primaryBlue}
        >
          Add Message
        </button>
        <button 
          onClick={() => dispatch(clearMessageCount())}
          style={{
            margin: '5px',
            padding: '5px 10px',
            backgroundColor: themeColors.mutedText,
            color: themeColors.primaryText,
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = themeColors.hoverBackground}
          onMouseLeave={(e) => e.target.style.backgroundColor = themeColors.mutedText}
        >
          Clear
        </button>
      </div>

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
