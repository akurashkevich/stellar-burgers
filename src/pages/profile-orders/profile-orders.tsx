import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getProfileOrdersThunk,
  profileOrdersSelector
} from '../../services/slices/profileOrdersSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(profileOrdersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileOrdersThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
