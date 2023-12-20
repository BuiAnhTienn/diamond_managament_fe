import React from 'react';

import { Role } from '@constants/Role';

import { useAuthContext } from '@contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { login } from '@services/auth.service';

import { Link, useNavigate } from 'react-router-dom';
import Button from '@components/Button';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CheckCircleFilled, RollbackOutlined } from '@ant-design/icons';
import { Input, Typography } from 'antd';
import { LoginContainer } from './styled';
import logo from '@assets/logo-nobg.png';

const schema = Yup.object({
  username: Yup.string()
    .required('Username is required!')
    .trim()
    .min(5, 'Must be more than 5 characters !')
    .max(20, 'Must be less than 20 characters !'),
  password: Yup.string()
    .required('Password is required!')
    .trim()
    .min(5, 'Must be more than 5 characters !')
    .max(20, 'Must be less than 20 characters !'),
});

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const { mutate } = useMutation(login, {
    onError: () => {
      toast.error('Sai tài khoản hoặc mật khẩu!');
    },
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem('access_token', data?.accessToken);
        auth.login?.(data?.user);
        if (data?.user?.role === Role.ADMIN) {
          navigate('/admin/category');
        } else {
          navigate('/');
        }

        toast('Đăng nhập thành công!');
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    async onSubmit(values) {
      mutate(values);
    },
  });

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    formik.setFieldValue(name, value);
  };

  return (
    <LoginContainer>
      <div className='bg-blur'></div>
      <div className='content'>
        <div className='login-content'>
          <img src={logo} alt='' className='login-logo' />
        </div>
        <div className='login-form'>
          <div className='mb-5 text-center'>
            <Typography className='text-[24px] font-bold text-[#475569]'>
              Chào mừng trở lại
            </Typography>
            <Typography className='text-[14px] text-[#94a3b8]'>
              Vui lòng đăng nhập để tiếp tục
            </Typography>
          </div>
          <div className='mb-3'>
            <Typography className='mb-2 text-[18px]'>Tên đăng nhập:</Typography>
            <Input onChange={handleChangeValue} name='username' />
            {formik.errors.username && (
              <div style={{ color: 'red' }}>{formik.errors.username}</div>
            )}
          </div>
          <div>
            <Typography className='mb-2 text-[18px]'>Mật khẩu:</Typography>
            <Input
              type='password'
              onChange={handleChangeValue}
              name='password'
            />
            {formik.errors.password && (
              <div style={{ color: 'red' }}>{formik.errors.password}</div>
            )}
          </div>
          <Button className='login-btn' onClick={() => formik.handleSubmit()}>
            Đăng nhập
          </Button>
          <div className='mb-3 text-center'>
            <Link to={'/quen-mat-khau'} className='text-[15px] text-[#1877f2]'>
              Quên mật khẩu?
            </Link>
          </div>
          <div className='login-info mb-5 text-[14px] text-[#64748b]'>
            <p>Lợi ích khi đăng nhập/đăng kí MyDiamond</p>
            <p>
              <CheckCircleFilled />
              Dễ dàng tra cứu hạng thẻ thành viên
            </p>
            <p>
              <CheckCircleFilled />
              Xem lịch sử giao dịch và hóa đơn điện tử
            </p>
            <p>
              <CheckCircleFilled />
              Xem đuợc ưu đãi dành riêng cho quý khách
            </p>
          </div>
          <Link to={'/dang-ky'} className='signup-link text-center'>
            Chưa có tài khoản? <span className='signup-btn'>Đăng ký ngay</span>
          </Link>
        </div>
        <Link to='/'>
          <p className='login-back'>
            <RollbackOutlined />
            <span className='ml-2'>Về trang chủ</span>
          </p>
        </Link>
      </div>
    </LoginContainer>
  );
};

export default Login;
