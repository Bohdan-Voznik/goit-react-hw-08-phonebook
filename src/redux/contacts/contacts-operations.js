import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseData } from 'js/parseData';
import { contactsActions } from 'redux/contacts';

const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/contacts');
      const result = data.map(contact => parseData(contact));
      return result;
    } catch (error) {
      switch (error.response.status) {
        case 404:
          error.message =
            'Sorry, we didn`t find your contacts, please try to log into your account';
          break;

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
  }
);

const addContact = createAsyncThunk(
  'contacts/addCntact',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/contacts', credentials);
      return data;
    } catch (error) {
      switch (error.response.status) {
        case 401:
          error.message = 'Sorry, you are not logged into your account.';
          break;

        case 400:
          error.message = 'Sorry, contact not created, please try again.';
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

const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/contacts/${credentials}`);
      thunkAPI.dispatch(contactsActions.deliteContactInState(credentials));
      return data;
    } catch (error) {
      switch (error.response.status) {
        case 404:
          error.message =
            'Sorry, we didn`t find your contacts, please try to log into your account';
          break;

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
  }
);

const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async (credentials, thunkAPI) => {
    const { contactId, name, phone: number } = credentials;

    try {
      const { data } = await axios.patch(`/contacts/${contactId}`, {
        name,
        number,
      });
      return data;
    } catch (error) {
      switch (error.response.status) {
        case 400:
          error.message = 'Sorry, contact not update, please try again.';
          break;
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
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
};

export default operations;
