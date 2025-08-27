import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  websocketConnected: false,
};

const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    setWebSocketConnectionStatus: (state, action) => {
      state.websocketConnected = action.payload;
    }
  }
});

export const { setWebSocketConnectionStatus } = webSocketSlice.actions;

export default webSocketSlice.reducer;
