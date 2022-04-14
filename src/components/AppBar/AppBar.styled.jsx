import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    width: 450px;
    height: 2px;
    left: 0px;
    bottom: 0px;
    background-color: #c4c4c4;
  }
`;

export const NavigationWrapper = styled.nav`
  display: flex;
`;

export const NavigationLink = styled(NavLink)`
  padding: 2px 15px 2px 15px;
  margin: 10px 0 10px 0;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  background-color: #fff;
  /* text-transform: uppercase; */

  border-radius: 15px;
  border: 1px solid #c4c4c4;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);

  &:hover {
    transform: scale(1.05);
  }

  &:not(:last-child) {
    margin-right: 15px;
  }

  &.active {
    background-color: #bbf6fa;
  }
`;
