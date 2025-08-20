import { configureStore } from '@reduxjs/toolkit'
import visibilitySlice from './slices/visibilitySlice'
import floatingWidgetSlice from './slices/floatingWidgetSlice'
import webSocketSlice from './slices/webSocketSlice'
import uiVisibilityReducer from '../Features/store/uiVisibilitySlice'
import chatStateReducer from '../Features/store/chatStateSlice'

export const store = configureStore({
  reducer: {
    visibility: visibilitySlice,
    floatingWidget: floatingWidgetSlice,
    webSocket: webSocketSlice,
    uiVisibility: uiVisibilityReducer,
    chatState: chatStateReducer,
    // Add your other reducers here as you create them
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'webSocket/setLastEvent', // Events might contain non-serializable data
          'webSocket/setWebSocketInstance', // WebSocket instance is non-serializable
        ],
        ignoredPaths: [
          'webSocket.lastEvent.data', // Event data might contain non-serializable values
          'webSocket.wsInstance', // WebSocket instance is non-serializable
        ],
      },
    }),
})

/* 
// If using TypeScript, move these to a .ts file:
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
*/
