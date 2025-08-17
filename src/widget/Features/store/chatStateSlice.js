import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: 'assistant',
      timestamp: new Date(Date.now() - 60000).toISOString() // 1 minute ago
    }
  ],
  isExpanded: false,
  position: { x: 0, y: 0 },
  isTyping: false
};

const chatStateSlice = createSlice({
  name: 'chatState',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    clearMessages(state) {
      state.messages = [initialState.messages[0]]; // Keep the initial greeting
    },
    setIsExpanded(state, action) {
      state.isExpanded = action.payload;
    },
    setPosition(state, action) {
      state.position = action.payload;
    },
    setIsTyping(state, action) {
      state.isTyping = action.payload;
    },
    resetChatState(state) {
      return initialState;
    }
  },
});

export const {
  addMessage,
  setMessages,
  clearMessages,
  setIsExpanded,
  setPosition,
  setIsTyping,
  resetChatState,
} = chatStateSlice.actions;

export default chatStateSlice.reducer;
