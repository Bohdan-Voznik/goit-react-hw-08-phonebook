import { createAction } from '@reduxjs/toolkit';

const changeFilter = createAction('contacts/filter');

const deliteContactInState = createAction('contacts/deliteContactInState');

const actions = { changeFilter, deliteContactInState };

export default actions;
