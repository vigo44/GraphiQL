import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchInputState {
  searchInput: string;
  queryPath: string;
}

const initialState: SearchInputState = {
  searchInput: '',
  queryPath: 'https://rickandmortyapi.com/api/character',
};

const searchSlice = createSlice({
  name: 'searchInput',
  initialState,
  reducers: {
    setSearchInput(state, actions: PayloadAction<string>) {
      state.searchInput = actions.payload;
    },
    setQueryPath(state, actions: PayloadAction<string>) {
      state.queryPath = actions.payload;
    },
  },
});

export const { setSearchInput, setQueryPath } = searchSlice.actions;

export default searchSlice.reducer;
