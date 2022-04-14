import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import {
  Form,
  Wrapper,
  Input,
  Button,
  ImgLabel,
  Img,
  RadioButtonWtapper,
  RadioButton,
  Title,
} from './EditForm.styled';
import { ReactComponent as IconAdd } from '../../img/plus.svg';
import { AVATARS_IMAGE } from 'js/avatarList';

import { contactsOperations, contactsSelectors } from 'redux/contacts';

import { Container } from 'components/Container/Container';

export const EditForm = () => {
  const disppatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarIndex, setAvatarIndex] = useState(null);
  const { contactId } = useParams();
  const contact = useSelector(state => {
    return contactsSelectors.getContactById(state, contactId);
  });

  useEffect(() => {
    if (!contact) {
      return;
    }
    const { name, number, avatar } = contact;
    const index = AVATARS_IMAGE.indexOf(avatar);
    setAvatarIndex(index);
    setName(name);
    setPhone(number);
  }, [contact]);

  const handleSubmit = e => {
    e.preventDefault();
    const isOnline = Math.random() < 0.5;

    const nameContact = `${name}/${isOnline}/${avatarIndex}`;

    disppatch(
      contactsOperations.updateContact({ contactId, name: nameContact, phone })
    );
    navigate('/contacts');
    reset();
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

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Edit contact</Title>
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
