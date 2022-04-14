import { useDispatch, useSelector } from 'react-redux';

import { Wrapper, Input, CreateContact } from './Filter.styled';

import { contactsActions } from 'redux/contacts';
import { Container } from 'components/Container/Container';
import { Spiner } from 'components/Spiner/Spiner';

import { ReactComponent as IconAdd } from 'img/plus.svg';

export const Filter = () => {
  const dispatch = useDispatch();
  const tag = useSelector(state => state.filter);

  return (
    <Container>
      <Wrapper>
        <Input
          type="text"
          name="filter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Filter"
          placeholder="Filter"
          required
          value={tag}
          onChange={e => dispatch(contactsActions.changeFilter(e.target.value))}
        />
        <CreateContact to="/contacts/create">
          {false ? (
            <Spiner size="40px" />
          ) : (
            <IconAdd fill="#ffffff" width="20px" height="20px" />
          )}
        </CreateContact>
      </Wrapper>
    </Container>
  );
};
