import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { authSelectors } from 'redux/auth';

export const PrivateRoute = ({ redirect }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to={redirect} />;
};

PrivateRoute.propTypes = {
  redirect: PropTypes.string.isRequired,
};
