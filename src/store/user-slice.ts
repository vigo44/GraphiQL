import { createSlice } from '@reduxjs/toolkit';

type User = {
  email: string | null;
  token: string | null;
  id: string | null;
};

const initialState: User = {
  email: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    logoutUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
