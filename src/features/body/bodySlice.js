import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBody } from './bodyAPI';

const initialState = {
    body: [],
    status: 'idle',
    error: null
};

export const getBody = createAsyncThunk(
  'mail/fetchBody',
  async (mail) => {
    const response = await fetchBody(mail);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const bodySlice = createSlice({
    name: 'body',
    initialState,
    reducers: {
        addToRead: {
            reducer(state, action){
                state.body.push(action.payload);
            }
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getBody.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getBody.fulfilled, (state, action) => {
            state.status = 'idle';
            state.body = action.payload;
          })
          .addCase(getBody.rejected, (state) => {
            state.status = 'error';
          })
      },
});

export const selectBody = (state) => state.body.body;
export const getBodyStatus = (state) => state.body.status;
export const getBodyError = (state) => state.body.error;

export default bodySlice.reducer;