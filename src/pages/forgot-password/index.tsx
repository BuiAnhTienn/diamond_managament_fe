import { RollbackOutlined } from '@ant-design/icons';
import Button from '@components/Button';
import { useAuthContext } from '@contexts/AuthContext';
import { forgotPassword } from '@services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { Input, Typography } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import logo from '../../assets/logo-nobg.png';
import { ForgotPasswordContainer } from './styled';

const schema = Yup.object({
  username: Yup.string()
    .required('Username is required!')
    .trim()
    .min(5, 'Must be more than 5 characters !')
    .max(20, 'Must be less than 20 characters !'),
});

const ForgotPassword = () => {
  const { mutate } = useMutation(forgotPassword, {
    onError: () => {
      toast.error('Tên đăng nhập không tồn tại!');
    },
    onSuccess: () => {
      toast.success('Đã gửi mail xác nhận thành công');
    },
  });

  const formik = useFormik({
    initialValues: {
      username: '',
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
    <ForgotPasswordContainer>
      <div className='bg-blur'></div>
      <div className='content'>
        <div className='login-content'>
          <img src={logo} alt='' className='login-logo' />
        </div>
        <div className='login-form mb-20'>
          <div className='mb-10 text-center'>
            <Typography.Title level={4} className='text-[20px]'>
              Quên mật khẩu
            </Typography.Title>
          </div>
          <div className='mb-3'>
            <Typography className='mb-2 text-[18px]'>Tên đăng nhập:</Typography>
            <Input onChange={handleChangeValue} name='username' />
            {formik.errors.username && (
              <div style={{ color: 'red' }}>{formik.errors.username}</div>
            )}
          </div>
          <Button className='login-btn' onClick={() => formik.handleSubmit()}>
            Gửi mail xác nhận
          </Button>
          <div className='text-center'>
            <Link to={'/dang-nhap'} className='login-link '>
              Đăng nhập
            </Link>
          </div>
        </div>
        <Link to='/'>
          <p className='login-back'>
            <RollbackOutlined />
            <span className='ml-2'>Về trang chủ</span>
          </p>
        </Link>
      </div>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
