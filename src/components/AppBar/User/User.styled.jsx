import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
`;

export const Img = styled.img`
  border-radius: 4px;
  margin-right: 10px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;

export const Button = styled.button`
  padding: 2px 12px 2px 12px;
  width: 81px;
  height: 25px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  background-color: #fff;

  border-radius: 15px;
  border: 1px solid #c4c4c4;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);

  &:hover {
    transform: scale(1.05);
  }
`;
