import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import webSocketManager from '../../services/webSocketManager';

const initialState = {
  wsInstance: webSocketManager,
  isConnected: false,
  isConnecting: false,
  lastEvent: null,
  eventHistory: [],
  error: null,
  connectionUrl: 'http://127.0.0.1:12672',
  socketId: null,
};

// Async thunk for connecting to WebSocket
export const connectWebSocket = createAsyncThunk(
  'webSocket/connect',
  async (options = {}, { dispatch, rejectWithValue }) => {
    try {
      console.log('🔌 Connecting to WebSocket...');
      
      const connected = await webSocketManager.connect(null, options);
      
      if (connected) {
        // Set up event listeners for Redux state updates
        webSocketManager.on('connect', () => {
          dispatch(setConnectionStatus(true));
          dispatch(setSocketId(webSocketManager.getSocket()?.id));
        });

        webSocketManager.on('disconnect', () => {
          dispatch(setConnectionStatus(false));
          dispatch(setSocketId(null));
        });

        webSocketManager.on('connect_error', (error) => {
          dispatch(setError(error.message || 'Connection failed'));
          dispatch(setConnectionStatus(false));
        });

        // Generic event listener for all events
        webSocketManager.on('*', (eventName, data) => {
          dispatch(setLastEvent({ event: eventName, data, timestamp: new Date().toISOString() }));
          dispatch(addToEventHistory({ event: eventName, data, timestamp: new Date().toISOString() }));
        });

        return true;
      } else {
        throw new Error('Failed to connect to WebSocket server');
      }
    } catch (error) {
      console.error('❌ WebSocket connection error:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for disconnecting from WebSocket
export const disconnectWebSocket = createAsyncThunk(
  'webSocket/disconnect',
  async (_, { dispatch }) => {
    try {
      console.log('🔌 Disconnecting from WebSocket...');
      
      webSocketManager.disconnect();
      
      dispatch(setConnectionStatus(false));
      dispatch(setSocketId(null));
      
      return true;
    } catch (error) {
      console.error('❌ WebSocket disconnect error:', error);
      return false;
    }
  }
);

// Async thunk for emitting events
export const emitWebSocketEvent = createAsyncThunk(
  'webSocket/emit',
  async ({ event, data, callback }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      
      if (!state.webSocket.isConnected) {
        throw new Error('WebSocket is not connected');
      }
      
      console.log(`📤 Emitting WebSocket event: ${event}`, data || '');
      
      webSocketManager.emit(event, data, callback);
      
      return { event, data, timestamp: new Date().toISOString() };
    } catch (error) {
      console.error('❌ WebSocket emit error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
      state.isConnecting = false;
    },
    setConnectingStatus: (state, action) => {
      state.isConnecting = action.payload;
    },
    setWebSocketInstance: (state, action) => {
      state.wsInstance = action.payload;
    },
    setLastEvent: (state, action) => {
      state.lastEvent = action.payload;
    },
    addToEventHistory: (state, action) => {
      state.eventHistory.unshift(action.payload);
      // Keep only last 100 events
      if (state.eventHistory.length > 100) {
        state.eventHistory = state.eventHistory.slice(0, 100);
      }
    },
    clearEventHistory: (state) => {
      state.eventHistory = [];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSocketId: (state, action) => {
      state.socketId = action.payload;
    },
    setConnectionUrl: (state, action) => {
      state.connectionUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Connect WebSocket
      .addCase(connectWebSocket.pending, (state) => {
        state.isConnecting = true;
        state.error = null;
      })
      .addCase(connectWebSocket.fulfilled, (state) => {
        state.isConnecting = false;
        state.isConnected = true;
      })
      .addCase(connectWebSocket.rejected, (state, action) => {
        state.isConnecting = false;
        state.isConnected = false;
        state.error = action.payload;
      })
      
      // Disconnect WebSocket
      .addCase(disconnectWebSocket.fulfilled, (state) => {
        state.isConnected = false;
        state.socketId = null;
      })
      
      // Emit event
      .addCase(emitWebSocketEvent.fulfilled, (state, action) => {
        // Event was successfully emitted
        state.lastEvent = action.payload;
      })
      .addCase(emitWebSocketEvent.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  setConnectionStatus,
  setConnectingStatus,
  setWebSocketInstance,
  setLastEvent,
  addToEventHistory,
  clearEventHistory,
  setError,
  clearError,
  setSocketId,
  setConnectionUrl,
} = webSocketSlice.actions;

// Export selectors
export const selectWebSocketInstance = (state) => state.webSocket.wsInstance;
export const selectIsConnected = (state) => state.webSocket.isConnected;
export const selectIsConnecting = (state) => state.webSocket.isConnecting;
export const selectLastEvent = (state) => state.webSocket.lastEvent;
export const selectEventHistory = (state) => state.webSocket.eventHistory;
export const selectError = (state) => state.webSocket.error;
export const selectSocketId = (state) => state.webSocket.socketId;
export const selectConnectionUrl = (state) => state.webSocket.connectionUrl;
export const selectConnectionStatus = (state) => ({
  isConnected: state.webSocket.isConnected,
  isConnecting: state.webSocket.isConnecting,
  socketId: state.webSocket.socketId,
  error: state.webSocket.error,
});

export default webSocketSlice.reducer;
