import { useSelector, useDispatch } from 'react-redux';

import { Img, Wrapper, ContentWrapper, Title, Button } from './User.styled';
import dedaultImg from '../../../img/default.jpg';

import { Spiner } from 'components/Spiner/Spiner';

import { authSelectors, authOperations } from 'redux/auth';

export const User = () => {
  const dispatch = useDispatch();
  const userName = useSelector(authSelectors.getUserName);
  const isLoadingUser = useSelector(authSelectors.getIsLoadingUser);

  return (
    <Wrapper>
      <Img src={dedaultImg} width="50px" height="50px" />
      <ContentWrapper>
        <Title>{`Hi, ${userName}`}</Title>
        <Button
          type="button"
          onClick={() => {
            dispatch(authOperations.logOut());
          }}
        >
          {isLoadingUser ? <Spiner size="15px" dotsColor="#333" /> : 'Log Out'}
        </Button>
      </ContentWrapper>
    </Wrapper>
  );
};
