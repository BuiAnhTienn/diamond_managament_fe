import { Role } from '@constants/Role';
import { useAuthContext } from '@contexts/AuthContext';
import { me } from '@services/user.service';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = ({
  isNomarlRoute = false,
  roles = [],
  notRoles = [],
}: {
  isNomarlRoute?: boolean;
  roles?: Role[];
  notRoles?: Role[];
}) => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (auth.user === undefined) {
        try {
          const user = await me();
          auth.login?.(user);

          if (!roles?.includes(user?.role) && !isNomarlRoute) {
            navigate('/access-denied', { replace: true });
          }
          if (notRoles?.includes(user?.role)) {
            navigate('/access-denied', { replace: true });
          }
        } catch (error) {
          if (!isNomarlRoute) {
            navigate('/dang-nhap', { replace: true });
          }
        }
      }
    })();
  }, [auth]);

  return isNomarlRoute ? <Outlet /> : auth.user ? <Outlet /> : <>Loading...</>;
};

export default PrivateRoute;
