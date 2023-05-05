import { useSelector } from 'react-redux';
import { CheckAuth } from '../../hooks/check-auth';

import { RootState } from '../../store';

function Welcome() {
  const { isAuth } = CheckAuth();
  const name = useSelector((state: RootState) => state.user.name);

  return (
    <div>
      <h1>Welcome</h1>
      {isAuth && <h2>{name}</h2>}
    </div>
  );
}

export default Welcome;
