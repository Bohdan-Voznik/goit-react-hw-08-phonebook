import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px 0 25px 0;
`;

export const Input = styled.input`
  display: block;
  width: 325px;
  height: 44px;
  padding: 0 30px 0 30px;

  box-shadow: 0px 4px 12px 6px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 22px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  &:focus {
    outline: 2px solid #828282;
  }

  &::placeholder {
    color: #3a3a3a;
  }
`;

export const CreateContact = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #49af4b;
  border: 3px solid #4d884e;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;
