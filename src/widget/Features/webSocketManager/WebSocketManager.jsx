import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setWebSocketInstance, setConnectionStatus } from '../../store/slices/webSocketSlice';
import webSocketManager from '../../services/webSocketManager';

const WebSocketManager = () => {
  const dispatch = useDispatch();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      // Set the WebSocket instance in Redux
      dispatch(setWebSocketInstance(webSocketManager));
      
      // Set up connection status listeners
      const handleConnect = () => {
        dispatch(setConnectionStatus(true));
      };

      const handleDisconnect = () => {
        dispatch(setConnectionStatus(false));
      };

      // Add event listeners to WebSocket manager
      webSocketManager.on('connect', handleConnect);
      webSocketManager.on('disconnect', handleDisconnect);

      // Mark as initialized
      isInitialized.current = true;

      console.log('🔧 WebSocket Manager component initialized');

      // Cleanup listeners on unmount
      return () => {
        webSocketManager.off('connect', handleConnect);
        webSocketManager.off('disconnect', handleDisconnect);
      };
    }
  }, [dispatch]);

  // This component doesn't render anything visible
  return null;
};

export default WebSocketManager;
