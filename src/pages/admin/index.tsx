import {
  BarsOutlined,
  DropboxOutlined,
  LineChartOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ShopOutlined,
  ShoppingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import logo from '@assets/logo.jpg';
import { useAuthContext } from '@contexts/AuthContext';
import type { MenuProps } from 'antd';
import { Dropdown, Layout, Menu, Space } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import React, { useMemo, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DashboardContainer } from './styled';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Admin: React.FC = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const selectedKey: string | undefined = useMemo(() => {
    if (location.pathname === '/admin/category') return '1';
    if (location.pathname === '/admin/sub-category') return '2';
    if (location.pathname === '/admin/product') return '3';
    if (location.pathname === '/admin/warehouse') return '4';
  }, [location.pathname]);

  const items: MenuItem[] = [
    getItem(
      <div onClick={() => navigate('/admin/statistics')}>Thống kê</div>,
      '0',
      <ShoppingOutlined />
    ),
    getItem(
      <div onClick={() => navigate('/admin/order')}>Quản lý đơn hàng</div>,
      '1',
      <ShoppingOutlined />
    ),
    getItem(
      <div onClick={() => navigate('/admin/trending')}>Quản lý xu hướng</div>,
      '2',
      <LineChartOutlined />
    ),
    getItem(
      <div onClick={() => navigate('/admin/category')}>Quản lý danh mục</div>,
      '3',
      <BarsOutlined />
    ),
    getItem(
      <div onClick={() => navigate('/admin/sub-category')}>
        Quản lý phụ mục
      </div>,
      '4',
      <ProfileOutlined />
    ),
    getItem(
      <div onClick={() => navigate('/admin/product')}>Quản lý sản phẩm</div>,
      '5',
      <DropboxOutlined />
    ),
    getItem(
      <div onClick={() => navigate('/admin/warehouse')}>Quản lý kho</div>,
      '6',
      <ShopOutlined />
    ),
    getItem(
      <div onClick={() => navigate('/admin/user')}>Quản lý tài khoản</div>,
      '7',
      <TeamOutlined />
    ),
  ];
  const dropdownItems: MenuProps['items'] = [
    {
      key: '2',
      label: (
        <div
          onClick={() => {
            localStorage.removeItem('access_token');
            toast('Đăng xuất thành công!');
            navigate('/dang-nhap');
          }}
        >
          Đăng xuất
        </div>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <DashboardContainer>
      <Layout hasSider={true} style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ background: '#F8F0E9' }}
        >
          <div className='header'>
            <Link to={'/'}>
              <img src={logo} alt='' className='w-full px-[10%] mt-10 mb-5' />
            </Link>
          </div>
          <Menu
            theme='light'
            defaultSelectedKeys={[selectedKey ?? '']}
            mode='inline'
            items={items}
            style={{ background: '#F8F0E9' }}
          ></Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: '0 30px' }}>
            <div className='header-wrapper'>
              <p className='header-title'></p>
              <Dropdown
                menu={{ items: dropdownItems }}
                className='header-dropdown'
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <div className='header-hi'>
                      <span className=''>Hi, {auth?.user?.fullName}</span>
                      <img
                        src='https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                        alt=''
                        className='admin-icon'
                      />
                    </div>
                  </Space>
                </a>
              </Dropdown>
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </DashboardContainer>
  );
};

export default Admin;
