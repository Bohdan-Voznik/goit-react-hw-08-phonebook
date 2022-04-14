const getIsLoggedIn = state => state.auth.isLoggedIn;

const getUserName = state => state.auth.user.name;

const getIsFetchingCurentUser = state => state.auth.isFetchingCurentUser;
const getIsLoadingUser = state => state.auth.isLoadingUser;

const authSelectors = {
  getIsLoggedIn,
  getUserName,
  getIsFetchingCurentUser,
  getIsLoadingUser,
};

export default authSelectors;
