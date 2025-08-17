import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isVisible: false, // Components are hidden by default
}

const visibilitySlice = createSlice({
  name: 'visibility',
  initialState,
  reducers: {
    showComponents: (state) => {
      state.isVisible = true
    },
    hideComponents: (state) => {
      state.isVisible = false
    },
    toggleVisibility: (state) => {
      state.isVisible = !state.isVisible
    },
  },
})

export const { showComponents, hideComponents, toggleVisibility } = visibilitySlice.actions
export default visibilitySlice.reducer
