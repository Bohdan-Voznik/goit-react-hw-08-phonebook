import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { authOperations, authSelectors } from 'redux/auth';
import { contactsOperations } from 'redux/contacts';

import { Contacts } from 'components/Contacts/Contacts';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { AppBar } from './AppBar/AppBar';
import { LogIn } from 'components/LogIn/LogIn';
import { Registration } from 'components/Registration/Registration';
import { EditForm } from './EditForm/EditForm';
import { Home } from './Home/Home';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { PublicRoute } from './PublicRoute/PublicRoute';

export const App = () => {
  const dispatch = useDispatch();
  const isFetchingCurentUser = useSelector(
    authSelectors.getIsFetchingCurentUser
  );
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const errorAuth = useSelector(state => state.auth.error);
  const errorContacts = useSelector(state => state.contacts.error);

  const notify = (type, text) => {
    const options = {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    };

    if (type === 'error') {
      toast.error(text, options);
    }
    if (type === 'warning') {
      toast.warn(text, options);
    }
    if (type === 'info') {
      toast.info(text, options);
    }
  };

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (errorAuth) {
      switch (errorAuth.status) {
        case 400:
          notify('info', errorAuth.message);
          break;

        default:
          notify('error', errorAuth.message);
          break;
      }
    }
  }, [errorAuth]);

  useEffect(() => {
    if (errorContacts) {
      switch (errorContacts.status) {
        case 401:
          notify('info', errorContacts.message);
          break;

        case 400:
          notify('warning', errorContacts.message);
          break;

        default:
          notify('error', errorContacts.message);
          break;
      }
      notify('error', errorContacts.message);
    }
  }, [errorContacts]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(contactsOperations.fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  return (
    !isFetchingCurentUser && (
      <>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* ----------PrivateRoute---------- */}
          <Route element={<PrivateRoute redirect="/login" />}>
            <Route path="/contacts" element={<Contacts />} />
          </Route>
          <Route element={<PrivateRoute redirect="/login" />}>
            <Route path="contacts/edit/:contactId/*" element={<EditForm />} />
          </Route>
          <Route element={<PrivateRoute redirect="/login" />}>
            <Route
              path="/contacts/create"
              element={<ContactForm notify={notify} />}
            />
          </Route>

          {/* ----------PublicRoute---------- */}
          <Route element={<PublicRoute redirect="/contacts" />}>
            <Route path="login" element={<LogIn />} />
          </Route>
          <Route element={<PublicRoute redirect="/contacts" />}>
            <Route path="register" element={<Registration />} />
          </Route>
          <Route element={<PrivateRoute redirect="/contacts" />}>
            <Route path="contacts/edit/:contactId/*" element={<EditForm />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    )
  );
};
