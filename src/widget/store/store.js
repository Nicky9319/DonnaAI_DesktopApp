import { configureStore } from '@reduxjs/toolkit'
import visibilitySlice from './slices/visibilitySlice'
import floatingWidgetSlice from './slices/floatingWidgetSlice'
import uiVisibilityReducer from './slices/uiVisibilitySlice'
import chatStateReducer from './slices/chatStateSlice'
import webSocketReducer from './slices/websocketSlice'

export const store = configureStore({
  reducer: {
    visibility: visibilitySlice,
    floatingWidget: floatingWidgetSlice,
    uiVisibility: uiVisibilityReducer,
    chatState: chatStateReducer,
    webSocket: webSocketReducer,
    // Add your other reducers here as you create them
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

/* 
// If using TypeScript, move these to a .ts file:
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
*/
