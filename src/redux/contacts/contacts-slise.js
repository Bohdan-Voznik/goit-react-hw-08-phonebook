import { createSlice } from '@reduxjs/toolkit';
import { contactsOperations } from 'redux/contacts';

const initialState = {
  items: [],
  filter: '',
  error: null,
  isContactLoading: false,
  isDeliting: { status: false, id: null },
};

const contactSlise = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    'contacts/filter'(state, actions) {
      state.filter = actions.payload;
    },
    'contacts/deliteContactInState'(state, actions) {
      state.items = state.items.filter(({ id }) => id !== actions.payload);
    },

    // ----------FetchContacts----------
    [contactsOperations.fetchContacts.pending](state, actions) {
      state.isContactLoading = true;
    },
    [contactsOperations.fetchContacts.fulfilled](state, actions) {
      state.items = actions.payload;
      state.isContactLoading = false;
    },
    [contactsOperations.fetchContacts.rejected](state, actions) {
      state.error = actions.payload;
      state.isContactLoading = false;
    },

    // ----------AddContact----------
    [contactsOperations.addContact.pending](state, actions) {
      state.isContactLoading = true;
    },
    [contactsOperations.addContact.fulfilled](state, actions) {
      state.isContactLoading = false;
    },
    [contactsOperations.addContact.rejected](state, actions) {
      state.error = actions.payload;
      state.isContactLoading = false;
    },
    // ----------DeleteContact----------

    [contactsOperations.deleteContact.pending](state, actions) {
      state.isDeliting = { status: true, id: actions.meta.arg };
    },
    [contactsOperations.deleteContact.fulfilled](state, actions) {
      state.isDeliting = initialState.isDeliting;
    },
    [contactsOperations.deleteContact.rejected](state, actions) {
      state.isDeliting = initialState.isDeliting;
      state.error = actions.payload;
    },
    // ----------UpdateContact----------
    [contactsOperations.updateContact.fulfilled](state, actions) {},
  },
});

export default contactSlise.reducer;
