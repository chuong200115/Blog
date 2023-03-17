import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    loginStart(state) {
      state.login.isFetching = true;
    },
    loginSuccess(state, action) {
      state.login.currentUser = action.payload;
      state.login.isFetching = false;
      state.login.error = false;
    },
    loginFailed(state) {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
