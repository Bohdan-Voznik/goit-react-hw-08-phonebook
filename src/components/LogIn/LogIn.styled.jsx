import styled from '@emotion/styled';

export const Form = styled.form`
  margin: 25px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-transform: uppercase;

  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 390px;
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

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const Button = styled.button`
  padding: 2px 15px 2px 15px;
  width: 103px;
  height: 30px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;

  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #c4c4c4;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;
