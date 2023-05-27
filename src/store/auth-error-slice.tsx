import { createSlice } from '@reduxjs/toolkit';

type authError = {
  error: string | null;
};

const initialState: authError = {
  error: null,
};

const authErrorSlice = createSlice({
  name: 'authError',
  initialState,
  reducers: {
    setAuthError(state, action) {
      state.error = action.payload.error;
    },
    removeAuthError(state) {
      state.error = null;
    },
  },
});

export const { setAuthError, removeAuthError } = authErrorSlice.actions;

export default authErrorSlice.reducer;
