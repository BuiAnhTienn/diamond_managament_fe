import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import {
  AppstoreOutlined,
  BarsOutlined,
  LogoutOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import { TaiKhoanContainer } from './styled';
import { useAuthContext } from '@contexts/AuthContext';

const ThongTinTaiKhoan: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();
  return (
    <TaiKhoanContainer>
      <div className='container'>
        <Row gutter={40}>
          <Col span={6}>
            <ul className='list-none'>
              <Link to={'thong-tin'}>
                <li className='px-3 py-2 rounded-md hover:bg-[#d6d6d6] hover:cursor-pointer'>
                  <AppstoreOutlined />
                  Thông tin tài khoản
                </li>
              </Link>
              <Link to={'lich-su'}>
                <li className='px-3 py-2 rounded-md my-4 hover:bg-[#d6d6d6] hover:cursor-pointer'>
                  <BarsOutlined /> Lịch sử mua hàng
                </li>
              </Link>
              <div
                onClick={() => {
                  auth?.logout?.();
                  localStorage.removeItem('access_token');
                  navigate('/dang-nhap');
                  auth?.logout?.();
                }}
              >
                <li className='px-3 py-2 rounded-md my-4 hover:bg-[#d6d6d6] hover:cursor-pointer'>
                  <LogoutOutlined /> Đăng xuất
                </li>
              </div>
              <Link to={'/'}>
                <li className='px-3 py-2 rounded-md my-4 hover:bg-[#d6d6d6] hover:cursor-pointer'>
                  <RollbackOutlined /> Về trang chủ
                </li>
              </Link>
            </ul>
          </Col>
          <Col span={18}>
            <Outlet />
          </Col>
        </Row>
      </div>
    </TaiKhoanContainer>
  );
};

export default ThongTinTaiKhoan;
