import { configureStore } from '@reduxjs/toolkit'
import visibilitySlice from './slices/visibilitySlice'

export const store = configureStore({
  reducer: {
    visibility: visibilitySlice,
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
