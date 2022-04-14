import { useSelector } from 'react-redux';

import { Wrapper, NavigationLink, NavigationWrapper } from './AppBar.styled';

import { Container } from 'components/Container/Container';
import { User } from './User/User';

import { authSelectors } from 'redux/auth';

export const AppBar = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <Container>
      <Wrapper>
        <NavigationWrapper>
          <NavigationLink to="/">Home</NavigationLink>
          {isLoggedIn && (
            <NavigationLink to="/contacts">Contacts</NavigationLink>
          )}
        </NavigationWrapper>
        {isLoggedIn ? (
          <User />
        ) : (
          <div>
            <NavigationLink to="/register">Register</NavigationLink>
            <NavigationLink to="/login">Log In</NavigationLink>
          </div>
        )}
      </Wrapper>
    </Container>
  );
};
