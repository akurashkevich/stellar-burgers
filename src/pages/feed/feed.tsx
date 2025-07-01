import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeedsThunk,
  feedsErrorSelector,
  feedsLoadingSelector,
  feedsOrdersSelector
} from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(feedsOrdersSelector);
  const feedError = useSelector(feedsErrorSelector);
  const feedLoading = useSelector(feedsLoadingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, []);

  if (feedLoading) {
    return <Preloader />;
  }

  return (
    <>
      {feedError ? (
        <p> Запрос заказов завершился с ошибкой: {feedError}</p>
      ) : (
        <FeedUI
          orders={orders}
          handleGetFeeds={() => {
            dispatch(getFeedsThunk());
          }}
        />
      )}
    </>
  );
};
