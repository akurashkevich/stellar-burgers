import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userDataSelector } from '../../services/slices/authSlice';

export const AppHeader: FC = () => {
  const userData = useSelector(userDataSelector);
  return <AppHeaderUI userName={userData ? userData.name : ''} />;
};
