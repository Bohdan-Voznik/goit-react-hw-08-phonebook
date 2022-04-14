import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { authSelectors } from 'redux/auth';

export const PublicRoute = ({ redirect }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirect} /> : <Outlet />;
};

PublicRoute.propTypes = {
  redirect: PropTypes.string.isRequired,
};
