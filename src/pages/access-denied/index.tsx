import Button from '@components/Button';
import { Role } from '@constants/Role';
import { useAuthContext } from '@contexts/AuthContext';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const handleNavigateHomepage = () => {
    navigate(auth.user?.role === Role.ADMIN ? `/admin/order` : `/`);
  };

  return (
    <div className='flex justify-center items-center flex-col gap-10 p-10'>
      <Typography.Title level={1}>
        Bạn không có quyền đăng nhập vào trang này
      </Typography.Title>
      <Typography.Title level={3}>Trở lại trang chủ</Typography.Title>
      <Button onClick={handleNavigateHomepage}>Trở lại</Button>
    </div>
  );
};

export default AccessDenied;
