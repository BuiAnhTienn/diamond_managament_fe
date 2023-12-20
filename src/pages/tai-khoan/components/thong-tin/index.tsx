import React, { useEffect } from 'react';
import { UserInfoContainer } from './styled';
import { Col, Row, Typography, Input } from 'antd';
import Button from '@components/Button';
import { useAuthContext } from '@contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { updateInfo } from '@services/user.service';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const ThongTin = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const schema = Yup.object({
    fullName: Yup.string()
      .required('Name is required!')
      .trim()
      .min(5, 'Must be more than 5 characters !')
      .max(20, 'Must be less than 20 characters !'),
    email: Yup.string().required('Email is required!').email().trim(),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    async onSubmit(values) {
      mutate(values);
    },
  });

  const { mutate } = useMutation(updateInfo, {
    onError: () => {
      toast.error('Có lỗi xảy ra!');
    },
    onSuccess: () => {
      toast.success(`Cập nhật thành công`);
      navigate('/tai-khoan/thong-tin');
    },
  });

  useEffect(() => {
    formik.setFieldValue('fullName', auth?.user?.fullName);
    formik.setFieldValue('email', auth?.user?.email);
  }, []);

  return (
    <UserInfoContainer>
      <Typography className='heading'>Thông Tin Của Bạn</Typography>
      <div className='content'>
        <div className='info-form'>
          <Row>
            <Col span={8}>
              <Typography className='mb-3'>Họ và tên:</Typography>
            </Col>
            <Col span={16}>
              <Input
                className='mb-3'
                value={formik.values.fullName}
                onChange={(e) =>
                  formik.setFieldValue('fullName', e.target.value)
                }
              />
            </Col>
            <Col span={8}>
              <Typography className='mb-3'>Email:</Typography>
            </Col>
            <Col span={16}>
              <Input
                className='mb-3'
                value={formik.values.email}
                onChange={(e) => formik.setFieldValue('email', e.target.value)}
              />
            </Col>
            <Col span={8}>
              <Typography className='mb-3'>Tên đăng nhập:</Typography>
            </Col>
            <Col span={16}>
              <Typography className='mb-3'>{auth?.user?.username}</Typography>
            </Col>
            <Col span={8}>
              <Typography className='mb-3'>Mật khẩu:</Typography>
            </Col>
            <Col span={16}>
              <div className='flex'>
                <Typography className='mb-3 mr-3'>•••••••••</Typography>
                <Link
                  to='/tai-khoan/doi-mat-khau'
                  className='leading-6 text-[14px] !text-[#69b1ff]'
                >
                  Đổi mật khẩu
                </Link>
              </div>
            </Col>
          </Row>
          <div className='mt-5'>
            <Button type='link' className='mr-5' onClick={() => navigate('/')}>
              Về trang chủ
            </Button>
            <Button onClick={() => formik.handleSubmit()} className='w-[100px]'>
              Lưu
            </Button>
          </div>
        </div>
        <div className='avatar'>
          <img
            src='https://cdn-icons-png.flaticon.com/256/236/236831.png'
            alt=''
            className='ava-img'
          />
          <Typography>{auth.user?.fullName}</Typography>
        </div>
      </div>
    </UserInfoContainer>
  );
};

export default ThongTin;
