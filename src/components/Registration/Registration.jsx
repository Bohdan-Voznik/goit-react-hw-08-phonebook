import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form, Title, Input, Button } from './Registration.styled';

import { Container } from 'components/Container/Container';
import { Spiner } from 'components/Spiner/Spiner';

import { authOperations, authSelectors } from 'redux/auth';

export const Registration = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('Bohdan');
  const [email, setEmail] = useState('user122@ukr.net');
  const [password, setPassword] = useState('7895123Bb');
  const isLoadingUser = useSelector(authSelectors.getIsLoadingUser);

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(authOperations.register({ name, email, password }));
  };

  const handleChange = e => {
    const text = e.currentTarget.value;
    const inputName = e.currentTarget.name;

    switch (inputName) {
      case 'name':
        setName(text);
        break;
      case 'email':
        setEmail(text);
        break;
      case 'password':
        setPassword(text);
        break;

      default:
        break;
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Registration</Title>
        <Input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <Button type="submit">
          {isLoadingUser ? <Spiner size="20px" dotsColor="#333" /> : 'Register'}
        </Button>
      </Form>
    </Container>
  );
};
