import { UserContainer } from './styled';
import { Typography } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const User = () => {
  return (
    <UserContainer>
      <div className='container'>
        <div className='grid grid-cols-12 gap-5'>
          <div className='user-info col-span-2'>
            <div className='user-name'>
              <img
                src='https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                alt=''
                className='user-icon'
              />
              <Typography>Huy rom`</Typography>
            </div>
            <ul className='users-link'>
              <li>
                <Link to='/user/info'>Thông tin cá nhân</Link>
              </li>
              <li>
                <Link to={'/user/booking'}>Lịch hẹn</Link>
              </li>
              <li>
                <Link to={'/user/order'}>Đơn mua</Link>
              </li>
              <li>
                <Link to={'/user/history'}>Lịch sử</Link>
              </li>
            </ul>
          </div>
          <div className='user-content col-span-10 bg-white'>
            <Outlet />
          </div>
        </div>
      </div>
    </UserContainer>
  );
};

export default User;
