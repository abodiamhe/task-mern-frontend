// createAsyncThunk handle asynchronous actions (like API calls)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authService from './authService';

const localuser = JSON.parse(localStorage.getItem('user'));

//Initial state of our object
const initialState = {
  user: localuser ? localuser : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//'auth/register': from the auth slice, take the register action
//user: userData, this is passed when register is dispatch
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user); //API call to backend with userData
    //NOTE: Redux automatically sends the returned value as the action.payload of the fulfilled action.
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    //to return custom error messages
    return thunkAPI.rejectWithValue(message);
  }
});

//login async action creator (thunk)
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data & error.response.data.message) ||
      error.message ||
      error.toString();
    //to return custom error messages
    return thunkAPI.rejectWithValue(message);
  }
});

//Logout user when async action creator (thunk) is dispatch
export const logout = createAsyncThunk('auth/logout', async () => await authService.logout());

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  //Listen to action created from Thunk
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; //Value return
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; //Error message return
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; //Value return
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; //Error message return
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

// You name your thunk with 'auth/register'
// createAsyncThunk makes 3 actions from it.
// You “listen” for those actions in extraReducers using:
