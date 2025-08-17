import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationCount: 0,
  currentState: 'Online', // Default state
};

const floatingWidgetSlice = createSlice({
  name: 'floatingWidget',
  initialState,
  reducers: {
    setNotificationCount: (state, action) => {
      state.notificationCount = action.payload;
    },
    incrementNotificationCount: (state) => {
      state.notificationCount += 1;
    },
    clearNotificationCount: (state) => {
      state.notificationCount = 0;
    },
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
  },
});

export const {
  setNotificationCount,
  incrementNotificationCount,
  clearNotificationCount,
  setCurrentState,
} = floatingWidgetSlice.actions;

export default floatingWidgetSlice.reducer;
