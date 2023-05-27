import { useSelector } from 'react-redux';
import { RootState } from 'store';

export function CheckAuth() {
  const { id } = useSelector((state: RootState) => state.user);

  return {
    isAuth: !!id,
  };
}
