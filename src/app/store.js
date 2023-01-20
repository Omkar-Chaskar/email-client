import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import mailReducer from '../features/mail/mailSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    mail: mailReducer,
  },
});
