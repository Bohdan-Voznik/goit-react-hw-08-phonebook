import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Form,
  Title,
  Wrapper,
  Input,
  Button,
  ImgLabel,
  Img,
  RadioButtonWtapper,
  RadioButton,
} from './ContactForm.styled';
import { ReactComponent as IconAdd } from '../../img/plus.svg';
import { AVATARS_IMAGE } from 'js/avatarList';

import { contactsOperations, contactsSelectors } from 'redux/contacts';

import { Container } from 'components/Container/Container';

export const ContactForm = ({ notify }) => {
  const disppatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('Bohdan Vozniak');
  const [phone, setPhone] = useState('+380990172235');
  const [avatarIndex, setAvatarIndex] = useState(0);
  const contacts = useSelector(contactsSelectors.getContacts);

  const handleSubmit = e => {
    e.preventDefault();
    const avatar = e.currentTarget.img.value;
    const isOnline = Math.random() < 0.5;

    const nameContact = `${name}/${isOnline}/${avatar}`;

    if (contacts.findIndex(contact => contact.name === name) !== -1) {
      notify('warning', `🦄 Wow so easy! ${name} is already in contacts`);
      return;
    }

    disppatch(
      contactsOperations.addContact({ name: nameContact, number: phone })
    );
    navigate('/contacts');
  };

  const handleChange = e => {
    const currentTarget = e.currentTarget.name;
    const value = e.currentTarget.value;

    switch (currentTarget) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;

      default:
        throw Error(`CurrentTarget ${currentTarget} is invalid`);
    }
  };

  return (
    <Container>
      <Title>Сreate contact</Title>
      <Form onSubmit={handleSubmit}>
        <Wrapper>
          <div>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={handleChange}
              value={name}
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Phone"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={handleChange}
              value={phone}
            />
          </div>
          <Button type="submit">
            <IconAdd fill="#ffffff" width="50px" height="50px" />
          </Button>
        </Wrapper>

        <RadioButtonWtapper>
          {AVATARS_IMAGE.map((img, index) => {
            return (
              <ImgLabel key={index}>
                <RadioButton
                  type="radio"
                  name="img"
                  value={index}
                  checked={index === avatarIndex}
                  onChange={() => setAvatarIndex(index)}
                />
                <Img src={img} width="80px" height="80px" alt="Avatar" />
              </ImgLabel>
            );
          })}
        </RadioButtonWtapper>
      </Form>
    </Container>
  );
};

ContactForm.propTypes = {
  notify: PropTypes.func.isRequired,
};
