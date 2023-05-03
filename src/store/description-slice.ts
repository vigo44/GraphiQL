import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DescriptionState {
  idDescription: string;
}

const initialState: DescriptionState = {
  idDescription: '',
};

const descriptionSlice = createSlice({
  name: 'idDescription',
  initialState,
  reducers: {
    setIdDescription(state, actions: PayloadAction<string>) {
      state.idDescription = actions.payload;
    },
  },
});

export const { setIdDescription } = descriptionSlice.actions;

export default descriptionSlice.reducer;
