import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementMessageCount, clearMessageCount } from '../../store/uiVisibilitySlice'
import { incrementNotificationCount, clearNotificationCount } from '../../../store/slices/floatingWidgetSlice'
import { themeColors } from '../../common/utils/colors'
import { 
  selectIsConnected,
  selectWebSocketInstance,
  connectWebSocket,
} from '../../../store/slices/webSocketSlice'
import WebSocketManager from '../../webSocketManager/WebSocketManager'
import FloatingWidget from '../../floatingWidget/FloatingWidget'
import ActionBar from '../../actionBar/ActionBar'
import ChatInterface from '../../chatInterface/ChatInterface'

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

  // WebSocket connection setup and monitoring
  useEffect(() => {
    // Check if WebSocket is already connected
    if (!isConnected && wsInstance) {
      // If not connected, try to connect
      console.log('🔌 Widget WebSocket not connected, attempting to connect...');
      wsInstance.connect();
    } else if (!wsInstance) {
      // If no WebSocket instance exists, dispatch connect action
      dispatch(connectWebSocket());
      console.log('🔌 Widget WebSocket connection initiated');
    } else if (isConnected) {
      console.log('🔌 Widget WebSocket already connected');
    }
  }, [dispatch, isConnected, wsInstance]);

  // Monitor WebSocket connection status and auto-reconnect if needed
  useEffect(() => {
    if (wsInstance) {
      const handleConnect = () => {
        console.log('🔌 Widget WebSocket connected successfully');
      };

      const handleDisconnect = () => {
        console.log('🔌 Widget WebSocket disconnected, attempting to reconnect...');
        // Auto-reconnect after a short delay
        setTimeout(() => {
          if (wsInstance && !wsInstance.getConnectionStatus()) {
            console.log('🔄 Attempting to reconnect WebSocket...');
            wsInstance.connect();
          }
        }, 2000); // 2 second delay before reconnection attempt
      };

      // Add event listeners
      wsInstance.connect();

      // Cleanup listeners on unmount
      return () => {
        wsInstance.disconnect();
      };
    }
  }, [wsInstance]);

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


  useEffect(() => {
    if (wsInstance) {
      wsInstance.on('test-event', (data) => {
        console.log('📡 Test event received:', data);
      });
    }
  }, [wsInstance]);

  return (
    <>
      {/* WebSocket Manager Component - Initializes WebSocket and updates Redux */}
      <WebSocketManager />

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
            if (wsInstance) {
              wsInstance.emit('test-event', { message: 'Hello from MainPage!' });
              console.log('📡 Test event emitted from MainPage');
            } else {
              console.warn('⚠️ WebSocket instance not available');
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
            if (wsInstance) {
              wsInstance.sendConnectionEvent();
            } else {
              console.warn('⚠️ WebSocket instance not available');
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
          Connect Event
        </button>
        <button 
          onClick={() => {
            if (wsInstance) {
              wsInstance.emit('test-widget-event', { message: 'Hello from widget!', timestamp: new Date().toISOString() });
            } else {
              console.warn('⚠️ WebSocket instance not available');
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
