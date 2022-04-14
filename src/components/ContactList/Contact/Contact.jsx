import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import {
  Li,
  Img,
  Table,
  Td,
  Span,
  Name,
  Status,
  Delete,
  Edit,
  ButtonsWrapper,
} from './Contact.styled';
import { ReactComponent as IconDelete } from 'img/cross.svg';
import { ReactComponent as IconEdit } from 'img/pencil.svg';
import { Spiner } from 'components/Spiner/Spiner';

import { contactsOperations, contactsSelectors } from 'redux/contacts';

export const Contact = ({ id, name, number, avatar, isOnline }) => {
  const dispatch = useDispatch();
  const isDeliting = useSelector(contactsSelectors.getIsDeliting);

  return (
    <Li>
      <Status isOnline={isOnline} />
      <Img src={avatar} width="80px" height="80px" alt={`Avatar of ${name}`} />
      <Table>
        <tbody>
          <tr>
            <Td>
              <Span>Name:</Span>
            </Td>
            <Td>
              <Name>{name.length > 15 ? `${name.slice(0, 13)}...` : name}</Name>
            </Td>
          </tr>
          <tr>
            <td>
              <Span>Phone:</Span>
            </td>
            <td>{number}</td>
          </tr>
        </tbody>
      </Table>

      <ButtonsWrapper>
        <Edit to={`/contacts/edit/${id}`}>
          <IconEdit fill="#ffffff" width="14px" height="14px" />
        </Edit>
        <Delete
          type="button"
          onClick={() => {
            dispatch(contactsOperations.deleteContact(id));
          }}
        >
          {isDeliting.status && isDeliting.id === id ? (
            <Spiner />
          ) : (
            <IconDelete fill="#ffffff" width="12px" height="12px" />
          )}
        </Delete>
      </ButtonsWrapper>
    </Li>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  isOnline: PropTypes.bool.isRequired,
};
