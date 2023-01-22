import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMail } from './mailAPI';

const initialState = {
    list: [],
    filter: [],
    status: 'idle',
    error: null
};

export const getMail = createAsyncThunk(
    'mail/fetchMail',
    async () => {
      const response = await fetchMail();
      // The value we return becomes the `fulfilled` action payload
      return response.data.list;
    }
);

export const mailSlice = createSlice({
    name: 'mail',
    initialState,
    reducers: {
        filterUnread:(state, action) => {
          const unreadList = state.list.filter((list) => action.payload.map(item => list.id !== item.id));
          // const restList = state.list.filter((list) => action.payload.map(item => list.id === item.id));
          state.filter = [...unreadList];
        },
        filterRead:(state, action) => {
          // const restList = state.list.filter((list) => action.payload.map(item => list.id !== item.id));
          state.filter = [...action.payload];
        },
        filterFavorite:(state, action) => {
          // const restList = state.list.filter((list) => action.payload.map(item => list.id !== item.id));
          state.filter = [...action.payload];
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getMail.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getMail.fulfilled, (state, action) => {
            state.status = 'idle';
            state.list = action.payload;
          })
          .addCase(getMail.rejected, (state) => {
            state.status = 'error';
          })
      },
});

export const { filterUnread, filterRead, filterFavorite } = mailSlice.actions;

export const selectAllMails = (state) => state.mail.list;
export const getMailStatus = (state) => state.mail.status;
export const getMailError = (state) => state.mail.error;
export const filterMails = (state) => state.mail.filter;

export default mailSlice.reducer;