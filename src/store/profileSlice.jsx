import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios/axiosInstance';

 //----------------------------------------
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      

      // Make API call to fetch profile data
      const response = await axiosInstance.get('/profile/');
        
      return response.data ;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//--------------------------------------------------------

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (formData , { rejectWithValue }) => {
    try {

      // Make API call to update the profile
      const response = await axiosInstance.put('/profile/', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


 


export const resetpassword = createAsyncThunk(
  'profile/resetpassword',
  async (formData , { rejectWithValue }) => {
    try {

      // Make API call to update the profile
      console.log(formData)
      const response = await axiosInstance.post('/resetpass/', formData);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




const initialState = {
  userProfile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    [updateProfile.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.userProfile = action.payload;
      state.error = null;
    },
    [updateProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default profileSlice.reducer;
