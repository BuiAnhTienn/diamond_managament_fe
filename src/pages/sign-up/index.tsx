// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { RollbackOutlined } from '@ant-design/icons';
import Input from '@components/Input';
import Button from '@components/Button';
import { register } from '@services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { Typography } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import logo from '../../assets/logo-nobg.png';
import { LoginContainer } from './styled';

const schema = Yup.object({
  username: Yup.string()
    .required('Trường này là bắt buộc!')
    .trim()
    .min(5, 'Không được ngắn hơn 5 ký tự!')
    .max(20, 'Must be less than 20 characters !'),
  password: Yup.string()
    .required('Trường này là bắt buộc!')
    .trim()
    .min(5, 'Không được ngắn hơn 5 ký tự!')
    .max(20, 'Must be less than 20 characters !'),
  email: Yup.string()
    .required('Trường này là bắt buộc!')
    .email('Đúng định dạng email!'),
  fullName: Yup.string()
    .required('Trường này là bắt buộc!')
    .min(3, 'Không được ngắn hơn 3 ký tự!'),
});

const SignUp = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation(register, {
    onError: () => {
      toast.error('Tên đăng nhập đã tồn tại!');
    },
    onSuccess: (data) => {
      if (data) {
        navigate('/dang-nhap');
        toast('Đăng ký tài khoản thành công!');
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      fullName: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    async onSubmit(values) {
      const { confirm_password, ...payload } = values;
      console.log(confirm_password);
      payload.role = 'user';
      mutate(payload);
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
          <div className='mb-3 text-center'>
            <Typography className='text-[20px] leading-6 font-bold text-[#475569]'>
              Chào mừng bạn đã đến với Diamond
            </Typography>
            <Typography className='text-[14px] text-[#94a3b8]'>
              Đăng ký ngay để hưởng ưu đãi
            </Typography>
          </div>
          <div className='mb-1'>
            <Typography className='mb-2 text-[18px]'>Tên đăng nhập:</Typography>
            <Input
              onChange={handleChangeValue}
              name='username'
              errorMessage={formik.errors.username}
            />
          </div>
          <div className='mb-1'>
            <Typography className='mb-2 text-[18px]'>Mật khẩu:</Typography>
            <Input
              type='password'
              onChange={handleChangeValue}
              name='password'
              errorMessage={formik.errors.password}
            />
          </div>
          <div className='mb-1'>
            <Typography className='mb-2 text-[18px]'>
              Xác nhận mật khẩu:
            </Typography>
            <Input
              type='password'
              onChange={handleChangeValue}
              name='confirm_password'
            />
          </div>
          <div className='mb-1'>
            <Typography className='mb-2 text-[18px]'>Email:</Typography>
            <Input
              onChange={handleChangeValue}
              name='email'
              errorMessage={formik.errors.email}
            />
          </div>
          <div className='mb-1'>
            <Typography className='mb-2 text-[18px]'>Họ và tên: </Typography>
            <Input
              onChange={handleChangeValue}
              name='fullName'
              errorMessage={formik.errors.fullName}
            />
          </div>

          <Button className='login-btn' onClick={() => formik.handleSubmit()}>
            Đăng ký
          </Button>
          <Link to={'/dang-nhap'} className='signup-link text-center'>
            Đã có tài khoản? <span className='signup-btn'>Đăng nhập</span>
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

export default SignUp;
