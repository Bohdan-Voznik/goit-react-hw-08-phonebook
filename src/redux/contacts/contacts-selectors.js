const getFilter = state => {
  return state.contacts.filter;
};

const getContacts = state => state.contacts.items;

const getVisibleContacts = state => {
  const filter = getFilter(state);
  const contacts = getContacts(state);
  const normalizedFilter = filter.toLowerCase();
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};

const getIsContactLoading = state => state.contacts.isContactLoading;

const getIsDeliting = state => state.contacts.isDeliting;

const getContactById = (state, id) => {
  const contacts = getContacts(state);
  const result = contacts.find(contact => contact.id === id);
  return result;
};

const selectors = {
  getFilter,
  getContacts,
  getVisibleContacts,
  getIsDeliting,
  getContactById,
  getIsContactLoading,
};

export default selectors;
