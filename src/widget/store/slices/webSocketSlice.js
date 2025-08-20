import { createSlice } from '@reduxjs/toolkit';
import webSocketManager from '../../services/webSocketManager';

const initialState = {
  wsManager: webSocketManager,
  isConnected: false,
};

const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
    initializeWebSocket: (state) => {
      state.wsManager.init();
    },
  }
})

export const { setConnectionStatus, initializeWebSocket } = webSocketSlice.actions;

export default webSocketSlice.reducer;