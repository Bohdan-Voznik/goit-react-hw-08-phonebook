import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form, Title, Input, Button } from './LogIn.styled';

import { Container } from 'components/Container/Container';
import { Spiner } from 'components/Spiner/Spiner';

import { authOperations, authSelectors } from 'redux/auth';

export const LogIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('user122@ukr.net');
  const [password, setPassword] = useState('7895123Bb');
  const isLoadingUser = useSelector(authSelectors.getIsLoadingUser);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.logIn({ email, password }));
  };

  const handleChange = e => {
    const currentTarget = e.currentTarget.name;
    const value = e.currentTarget.value;

    switch (currentTarget) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;

      default:
        throw Error(`CurrentTarget ${currentTarget} is invalid`);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Log In</Title>
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
        <Button>
          {isLoadingUser ? <Spiner size="20px" dotsColor="#333" /> : 'Log In'}
        </Button>
      </Form>
    </Container>
  );
};
