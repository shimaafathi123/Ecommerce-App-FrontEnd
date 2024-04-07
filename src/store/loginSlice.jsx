// loginSlice.jsx

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios/axiosInstance';

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/token/', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload ? action.payload.message : 'Server error';
      });
  },
});

export default loginSlice.reducer;
