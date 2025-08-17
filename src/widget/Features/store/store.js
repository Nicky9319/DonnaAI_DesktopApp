import { configureStore } from '@reduxjs/toolkit';
import uiVisibilityReducer from './uiVisibilitySlice';

const store = configureStore({
  reducer: {
    uiVisibility: uiVisibilityReducer,
  },
});

export default store;
