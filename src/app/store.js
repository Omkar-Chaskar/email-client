import { configureStore } from '@reduxjs/toolkit';
import bodyReducer from '../features/body/bodySlice';
import mailReducer from '../features/mail/mailSlice';
import favoriteReducer from '../features/favorite/favoriteSlice';
import readReducer from '../features/read/readSlice';

export const store = configureStore({
  reducer: {
    body: bodyReducer,
    mail: mailReducer,
    favorite: favoriteReducer,
    read: readReducer,
  },
});
