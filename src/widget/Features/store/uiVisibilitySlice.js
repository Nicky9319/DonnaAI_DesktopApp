import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  floatingWidgetVisible: true,
  actionBarVisible: true,
  chatInterfaceVisible: true,
};

const uiVisibilitySlice = createSlice({
  name: 'uiVisibility',
  j,
  reducers: {
    setFloatingWidgetVisible(state, action) {
      state.floatingWidgetVisible = action.payload;
    },
    setActionBarVisible(state, action) {
      state.actionBarVisible = action.payload;
    },
    setChatInterfaceVisible(state, action) {
      state.chatInterfaceVisible = action.payload;
    },
  },
});

export const {
  setFloatingWidgetVisible,
  setActionBarVisible,
  setChatInterfaceVisible,
} = uiVisibilitySlice.actions;

export default uiVisibilitySlice.reducer;
