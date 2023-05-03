import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserCard } from '../components/form/form';

interface UserState {
  users: UserCard[];
}

const initialState: UserState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, actions: PayloadAction<UserCard>) {
      state.users.push(actions.payload);
    },
  },
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
