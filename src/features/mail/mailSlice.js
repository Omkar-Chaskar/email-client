import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMail } from './mailAPI';

const initialState = {
    list: [],
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
        addToRead: {
            reducer(state, action){
                state.list.push(action.payload);
            }
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

export const selectAllMails = (state) => state.mail.list;
export const getMailStatus = (state) => state.mail.status;
export const getMailError = (state) => state.mail.error;

export default mailSlice.reducer;