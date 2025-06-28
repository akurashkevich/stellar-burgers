import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { IngredientDetails, ProtectedRoute } from '@components';
import '../../index.css';
import styles from './app.module.css';
import { Route, Routes } from 'react-router-dom';
import { AppHeader, Modal, OrderInfo } from '@components';

const App = () => {
  const handleModalClose = () => {};

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path={'/'} element={<ConstructorPage />} />
        <Route path={'/feed'} element={<Feed />} />
        <Route
          path={'/login'}
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/register'}
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/forgot-password'}
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/reset-password'}
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/profile'}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/profile/orders'}
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path={'*'} element={<NotFound404 />} />
        <Route
          path={'/feed/:number'}
          element={
            <Modal title='Детали заказа' onClose={handleModalClose}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path={'/ingredients/:id'}
          element={
            <Modal title='Детали ингредиента' onClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path={'/profile/orders/:number'}
          element={
            <ProtectedRoute>
              <Modal title='Детали заказа' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
