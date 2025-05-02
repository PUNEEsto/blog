
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  status: false, // Indicates whether the user is logged in
  userData: null, // Stores user information
  error: null, // Stores authentication errors
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload?.userData || null; // Handle undefined payload
      state.error = null; // Clear any previous errors
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.error = null; // Clear any previous errors
    },
    setError: (state, action) => {
      state.error = action.payload; // Set authentication error
    },
  },
});

// Export actions
export const { login, logout, setError } = authSlice.actions;

// Export reducer
export default authSlice.reducer;