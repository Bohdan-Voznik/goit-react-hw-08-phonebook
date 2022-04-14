import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Ul } from './ContactList.styled';

import { contactsOperations, contactsSelectors } from 'redux/contacts';
import { authSelectors } from 'redux/auth';

import { Contact } from 'components/ContactList/Contact/Contact';
import { Container } from 'components/Container/Container';
import { Spiner } from 'components/Spiner/Spiner';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getVisibleContacts);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const isContactLoading = useSelector(contactsSelectors.getIsContactLoading);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch, isLoggedIn]);

  return (
    <Container>
      {isContactLoading ? (
        <Spiner size="40px" dotsColor="#333" />
      ) : (
        <Ul>
          {contacts.map(({ id, name, number, isOnline, avatar }) => {
            return (
              <Contact
                key={id}
                id={id}
                name={name}
                number={number}
                avatar={avatar}
                isOnline={isOnline}
              />
            );
          })}
        </Ul>
      )}
    </Container>
  );
};
