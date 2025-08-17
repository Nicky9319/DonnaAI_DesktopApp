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

  // Handle click-through based on allWidgetsVisible state
  useEffect(() => {
    if (window.widgetAPI) {
      if (!allWidgetsVisible) {
        // Enable click-through when all widgets are hidden
        window.widgetAPI.enableClickThrough();
        console.log('Click-through enabled - all widgets hidden');
        
        // Also mark the entire document body as non-interactive
        if (window.markAsNonInteractive && document.body) {
          window.markAsNonInteractive(document.body);
        }
        
        // Add CSS class to body for additional click-through enforcement
        document.body.classList.add('all-widgets-hidden');
        document.body.style.pointerEvents = 'none';
      } else {
        // Disable click-through when widgets are visible
        window.widgetAPI.disableClickThrough();
        console.log('Click-through disabled - widgets visible');
        
        // Remove non-interactive marking from body
        if (document.body) {
          document.body.classList.remove('widget-click-through');
          document.body.classList.remove('all-widgets-hidden');
          document.body.style.pointerEvents = 'auto';
        }
      }
    }
  }, [allWidgetsVisible]);

  // Force click-through state when all widgets are hidden
  useEffect(() => {
    if (!allWidgetsVisible && window.enableClickThrough) {
      // Force enable click-through and keep it enabled
      const forceClickThrough = () => {
        if (!allWidgetsVisible) {
          window.enableClickThrough();
          
          // Also force disable pointer events on all elements
          const allElements = document.querySelectorAll('*');
          allElements.forEach(element => {
            if (!element.classList.contains('widget-interactive')) {
              element.style.pointerEvents = 'none';
            }
          });
        }
      };
      
      // Force click-through immediately and set up periodic checks
      forceClickThrough();
      const interval = setInterval(forceClickThrough, 100); // Check every 100ms
      
      return () => {
        clearInterval(interval);
        
        // Restore pointer events when component unmounts or state changes
        if (allWidgetsVisible) {
          const allElements = document.querySelectorAll('*');
          allElements.forEach(element => {
            if (!element.classList.contains('widget-click-through')) {
              element.style.pointerEvents = '';
            }
          });
        }
      };
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
