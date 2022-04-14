import { createSlice } from '@reduxjs/toolkit';
import { authOperations } from 'redux/auth';

const initialState = {
  user: { name: null, email: null },
  token: null,
  error: null,
  isLoggedIn: false,
  isLoadingUser: true,
  isFetchingCurentUser: true,
};

const authSlise = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    // ----------Register----------
    [authOperations.register.pending](state, action) {
      state.isLoadingUser = true;
    },
    [authOperations.register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoadingUser = false;
    },
    [authOperations.register.rejected](state, action) {
      state.error = action.payload;
      state.isLoadingUser = false;
    },
    // ----------LogIn----------
    [authOperations.logIn.pending](state, action) {
      state.isLoadingUser = true;
    },
    [authOperations.logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoadingUser = false;
    },
    [authOperations.logIn.rejected](state, action) {
      state.error = action.payload;
      state.isLoadingUser = false;
    },
    // ----------LogOut----------
    [authOperations.logOut.pending](state, action) {
      state.isLoadingUser = true;
    },
    [authOperations.logOut.fulfilled](state, action) {
      state.user = initialState.user;
      state.token = initialState.token;
      state.isLoggedIn = initialState.isLoggedIn;
      state.isLoadingUser = false;
    },
    [authOperations.logOut.rejected](state, action) {
      state.error = action.payload;
      state.isLoadingUser = false;
    },
    // ----------GetCurrentUser----------
    [authOperations.getCurrentUser.pending](state, action) {
      state.isFetchingCurentUser = true;
      state.isLoadingUser = true;
    },
    [authOperations.getCurrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isFetchingCurentUser = false;
      state.isLoadingUser = false;
    },
    [authOperations.getCurrentUser.rejected](state, action) {
      state.error = action.payload;
      state.isFetchingCurentUser = false;
      state.isLoadingUser = false;
    },
  },
});

export default authSlise.reducer;
