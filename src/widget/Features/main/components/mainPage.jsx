import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementMessageCount, clearMessageCount } from '../../../store/slices/uiVisibilitySlice'
import { incrementNotificationCount, clearNotificationCount } from '../../../store/slices/floatingWidgetSlice'
import { addMessage, setIsTyping } from '../../../store/slices/chatStateSlice'
import { themeColors } from '../../common/utils/colors'
import { 
  selectIsConnected,
  selectWebSocketInstance,
  connectWebSocket,
  disconnectWebSocket,
} from '../../../store/slices/websocketSlice'
import WebSocketManager from '../../webSocketManager/WebSocketManager'
import FloatingWidget from '../../floatingWidget/FloatingWidget'
import ActionBar from '../../actionBar/ActionBar'
import ChatInterface from '../../chatInterface/ChatInterface'

import webSocketManager from '../../../services/webSocketManager'

const MainPage = () => {
  const dispatch = useDispatch();
  const { floatingWidgetVisible, actionBarVisible, chatInterfaceVisible, allWidgetsVisible, messageCount } = useSelector(
    (state) => state.uiVisibility
  );
  const notificationCount = useSelector((state) => state.floatingWidget.notificationCount);
  
  // WebSocket state from Redux
  const isConnected = useSelector(selectIsConnected);
  const wsInstance = useSelector(selectWebSocketInstance);

  // Local state to handle smooth transitions
  const [localVisibility, setLocalVisibility] = useState({
    floatingWidget: floatingWidgetVisible && allWidgetsVisible,
    actionBar: actionBarVisible && allWidgetsVisible,
    chatInterface: chatInterfaceVisible && allWidgetsVisible
  });

  // WebSocket connection lifecycle management
  useEffect(() => {
    console.log('🔌 MainPage: Component mounted - connecting to WebSocket...');
    
    // Connect to WebSocket when component mounts
    dispatch(connectWebSocket({
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true
    }));

    // Cleanup function - disconnect when component unmounts
    return () => {
      console.log('🔌 MainPage: Component unmounting - disconnecting WebSocket...');
      dispatch(disconnectWebSocket());
    };
  }, [dispatch]);

  // Monitor WebSocket connection status
  useEffect(() => {
    if (isConnected) {
      console.log('✅ MainPage: WebSocket connected successfully');
    } else {
      console.log('❌ MainPage: WebSocket disconnected');
    }
  }, [isConnected]);

  // Handle click-through based on allWidgetsVisible state and dev tools
  useEffect(() => {
    if (window.widgetAPI) {
      if (!allWidgetsVisible) {
        // Enable click-through when all widgets are hidden
        window.widgetAPI.enableClickThrough();
      } else {
        // Disable click-through when widgets are visible
        window.widgetAPI.disableClickThrough();
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


  const handleDonnaMessage = (messages) => {
    console.log('Donna messages received:', messages);
    
    // Since we receive an array of messages, add each one to the chat
    messages.forEach(message => {
      // The message should already be in the correct format from the server
      // {type: "ai", data: {...}} or {type: "human", data: {...}}
      console.log('Adding message:', message);
      dispatch(addMessage(message));
    });
    
    dispatch(setIsTyping(false));
  }
  
  useEffect(() => {
    webSocketManager.connect()
    webSocketManager.on('donna-message', handleDonnaMessage)

    return () => {
      webSocketManager.disconnect()
    }
  },[dispatch])

  return (
    <>
      {/* WebSocket Manager Component - Initializes WebSocket instance */}
      <WebSocketManager />

      {/* WebSocket Lifecycle Test Component */}
      <WebSocketLifecycleTest />

      {/* Dev Tools Indicator */}
      <div style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        zIndex: 9999,
        backgroundColor: '#059669',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'none', // Will be shown via CSS when dev tools are detected
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }} id="dev-tools-indicator">
        🔧 Dev Tools Active - Screen Interactive
      </div>

      {/* Test Controls for Notification Badge and WebSocket Status */}
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
        <div style={{ marginBottom: '8px' }}>
          <span style={{ fontWeight: 'bold' }}>WebSocket: </span>
          <span style={{ 
            color: isConnected ? '#10B981' : '#EF4444',
            fontWeight: 'bold'
          }}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </span>
        </div>
        <div>Notification Count: {notificationCount}</div>
        <div style={{ 
          marginTop: '8px', 
          padding: '6px', 
          backgroundColor: '#1f2937', 
          borderRadius: '4px',
          fontSize: '10px',
          border: '1px solid #374151'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Debug Shortcuts:</div>
          <div>Ctrl+Shift+D: Toggle click-through</div>
          <div>Ctrl+Shift+L: Log state</div>
        </div>
        <button 
          onClick={() => dispatch(incrementNotificationCount())}
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
          Add Notification
        </button>
        <button 
          onClick={() => dispatch(clearNotificationCount())}
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
        <button 
          onClick={() => {
            if (wsInstance && isConnected) {
              wsInstance.emit('test-event', { message: 'Hello from MainPage!' });
              console.log('📡 Test event emitted from MainPage');
            } else {
              console.warn('⚠️ WebSocket not connected');
            }
          }}
          style={{
            margin: '5px',
            padding: '5px 10px',
            backgroundColor: '#10B981',
            color: themeColors.primaryText,
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#10B981'}
        >
          Test WS
        </button>
        <button 
          onClick={() => {
            if (wsInstance && isConnected) {
              wsInstance.emit('test-widget-event', { 
                message: 'Hello from widget!', 
                timestamp: new Date().toISOString() 
              });
            } else {
              console.warn('⚠️ WebSocket not connected');
            }
          }}
          style={{
            margin: '5px',
            padding: '5px 10px',
            backgroundColor: '#8B5CF6',
            color: themeColors.primaryText,
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#7C3AED'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#8B5CF6'}
        >
          Test Widget Event
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
