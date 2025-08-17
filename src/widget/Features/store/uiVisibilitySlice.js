import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  floatingWidgetVisible: true,
  actionBarVisible: true,
  chatInterfaceVisible: true,
  allWidgetsVisible: false, // New state to control all widgets visibility
};

const uiVisibilitySlice = createSlice({
  name: 'uiVisibility',
  initialState,
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
    // New actions for controlling all widgets
    showAllWidgets(state) {
      state.allWidgetsVisible = true;
      state.floatingWidgetVisible = true;
      state.actionBarVisible = true;
      state.chatInterfaceVisible = true;
    },
    hideAllWidgets(state) {
      state.allWidgetsVisible = false;
      state.floatingWidgetVisible = false;
      state.actionBarVisible = false;
      state.chatInterfaceVisible = false;
    },
    toggleAllWidgets(state) {
      state.allWidgetsVisible = !state.allWidgetsVisible;
      state.floatingWidgetVisible = state.allWidgetsVisible;
      state.actionBarVisible = state.allWidgetsVisible;
      state.chatInterfaceVisible = state.allWidgetsVisible;
    },
    setAllWidgetsVisible(state, action) {
      state.allWidgetsVisible = action.payload;
      state.floatingWidgetVisible = action.payload;
      state.actionBarVisible = action.payload;
      state.chatInterfaceVisible = action.payload;
    },
  },
});

export const {
  setFloatingWidgetVisible,
  setActionBarVisible,
  setChatInterfaceVisible,
  showAllWidgets,
  hideAllWidgets,
  toggleAllWidgets,
  setAllWidgetsVisible,
} = uiVisibilitySlice.actions;

export default uiVisibilitySlice.reducer;
