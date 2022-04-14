import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.Authorization = '';
  },
};

const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', credentials);
      const { data } = response;
      token.set(data.token);
      return data;
    } catch (error) {
      switch (error.response.status) {
        case 400:
          error.message =
            'Sorry, user with this email has already been created.';
          break;

        case 500:
          error.message = 'Sorry, something went wrong, please try again.';
          break;

        default:
          break;
      }

      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response.status,
      });
    }
  }
);

const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.post('/users/login', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    switch (error.response.status) {
      case 400:
        error.message = 'Sorry, wrong login or password';
        break;
      default:
        break;
    }
    return thunkAPI.rejectWithValue({
      message: error.message,
      status: error.response.status,
    });
  }
});

const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const { data } = await axios.post('/users/logout');
    token.unset();
    return data;
  } catch (error) {
    switch (error.response.status) {
      case 401:
        error.message = 'Sorry, you are not logged into your account.';
        break;

      case 500:
        error.message = 'Sorry, something went wrong, please try again.';
        break;

      default:
        break;
    }
    return thunkAPI.rejectWithValue({
      message: error.message,
      status: error.response.status,
    });
  }
});

const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue(null);
    }
    token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      switch (error.response.status) {
        case 401:
          error.message = 'Sorry, you are not logged into your account.';
          break;

        default:
          break;
      }
      return thunkAPI.rejectWithValue({
        message: error.message,
        status: error.response.status,
      });
    }
  }
);

const operations = {
  register,
  logIn,
  logOut,
  getCurrentUser,
};

export default operations;
