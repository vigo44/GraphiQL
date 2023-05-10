import { createSlice } from '@reduxjs/toolkit';

type modalOpen = {
  isPassResetModalOpen: boolean;
};

const initialState: modalOpen = {
  isPassResetModalOpen: false,
};

const passResetModalSlice = createSlice({
  name: 'passResetModalOpen',
  initialState,
  reducers: {
    setPassResetModalOpen(state) {
      state.isPassResetModalOpen = true;
    },
    setPassResetModalClose(state) {
      state.isPassResetModalOpen = false;
    },
  },
});

export const { setPassResetModalOpen, setPassResetModalClose } = passResetModalSlice.actions;

export default passResetModalSlice.reducer;
