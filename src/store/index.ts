import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-slice';
import authErrorReducer from './auth-error-slice';
import passResetModalReducer from './password-reset-modal-slice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    user: userReducer,
    authError: authErrorReducer,
    passResetModal: passResetModalReducer,
  },
});
