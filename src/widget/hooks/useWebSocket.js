import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import {
  selectIsConnected,
  selectIsConnecting,
  selectLastEvent,
  selectEventHistory,
  selectError,
  selectSocketId,
  selectWebSocketInstance,
  connectWebSocket,
  disconnectWebSocket,
  emitWebSocketEvent,
  clearError,
  clearEventHistory,
} from '../store/slices/websocketSlice';

/**
 * Custom hook for WebSocket functionality
 * Provides easy access to WebSocket state and actions
 */
export const useWebSocket = () => {
  const dispatch = useDispatch();
  
  // Select WebSocket state from Redux
  const isConnected = useSelector(selectIsConnected);
  const isConnecting = useSelector(selectIsConnecting);
  const lastEvent = useSelector(selectLastEvent);
  const eventHistory = useSelector(selectEventHistory);
  const error = useSelector(selectError);
  const socketId = useSelector(selectSocketId);
  const wsInstance = useSelector(selectWebSocketInstance);

  // Connect to WebSocket
  const connect = useCallback((options = {}) => {
    return dispatch(connectWebSocket(options));
  }, [dispatch]);

  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    return dispatch(disconnectWebSocket());
  }, [dispatch]);

  // Emit event
  const emit = useCallback((event, data, callback) => {
    return dispatch(emitWebSocketEvent({ event, data, callback }));
  }, [dispatch]);

  // Clear error
  const clearErrorState = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Clear event history
  const clearEvents = useCallback(() => {
    dispatch(clearEventHistory());
  }, [dispatch]);

  // Listen for specific events
  const on = useCallback((event, callback) => {
    if (wsInstance) {
      wsInstance.on(event, callback);
    }
  }, [wsInstance]);

  // Remove event listener
  const off = useCallback((event, callback) => {
    if (wsInstance) {
      wsInstance.off(event, callback);
    }
  }, [wsInstance]);

  // Get connection status
  const getConnectionStatus = useCallback(() => {
    if (wsInstance) {
      return wsInstance.getConnectionStatus();
    }
    return { isConnected: false, socketId: null, url: null };
  }, [wsInstance]);

  return {
    // State
    isConnected,
    isConnecting,
    lastEvent,
    eventHistory,
    error,
    socketId,
    wsInstance,
    
    // Actions
    connect,
    disconnect,
    emit,
    on,
    off,
    clearError: clearErrorState,
    clearEvents,
    getConnectionStatus,
  };
};

/**
 * Hook for listening to specific WebSocket events
 * @param {string} event - Event name to listen for
 * @param {Function} callback - Callback function to execute when event is received
 * @param {Array} deps - Dependencies array for useEffect
 */
export const useWebSocketEvent = (event, callback, deps = []) => {
  const { on, off } = useWebSocket();

  useEffect(() => {
    if (event && callback) {
      on(event, callback);
      
      return () => {
        off(event, callback);
      };
    }
  }, [event, callback, on, off, ...deps]);
};

/**
 * Hook for automatic WebSocket connection management
 * @param {Object} options - Connection options
 * @param {boolean} autoConnect - Whether to connect automatically
 */
export const useWebSocketConnection = (options = {}, autoConnect = true) => {
  const { connect, disconnect, isConnected, isConnecting, error } = useWebSocket();

  useEffect(() => {
    if (autoConnect && !isConnected && !isConnecting) {
      connect(options);
    }

    return () => {
      // Note: We don't auto-disconnect here as other components might need the connection
      // The connection should be managed at the application level
    };
  }, [autoConnect, isConnected, isConnecting, connect, options]);

  return {
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
  };
};