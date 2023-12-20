import Button from '@components/Button';
import Input from '@components/Input';
import {
  createWarehouse,
  editWarehouse,
  getWareHouseById,
} from '@services/warehouse.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Typography } from 'antd';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpsertWarehouse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { data: warehouse } = useQuery(
    ['warehouse-by-id', id],
    () => getWareHouseById(id ?? ``),
    {
      enabled: isEdit,
    }
  );

  const { mutate: createCategoryMutate } = useMutation(createWarehouse, {
    onSuccess: () => {
      toast.success(`Thêm kho hàng thành công`);
      navigate('/admin/warehouse');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra');
    },
  });

  const { mutate: editWarehouseMutate } = useMutation(editWarehouse, {
    onSuccess: () => {
      toast.success(`Sửa kho hàng thành công!`);
      navigate('/admin/warehouse');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra');
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      description: '',
    },
    async onSubmit(values) {
      if (isEdit) {
        editWarehouseMutate({
          id: id ?? ``,
          name: values.name,
          address: values.address,
          description: values.description,
        });
      } else {
        createCategoryMutate(values);
      }
    },
  });

  useEffect(() => {
    if (isEdit) {
      formik.setFieldValue('name', warehouse?.name);
      formik.setFieldValue('description', warehouse?.description);
      formik.setFieldValue('address', warehouse?.address);
    }
  }, [warehouse]);

  return (
    <div className='flex flex-col p-2 gap-4'>
      <Typography.Title level={3}>
        {isEdit ? `Cập nhật` : 'Thêm'} kho hàng
      </Typography.Title>
      <Input
        label='Tên kho'
        value={formik.values.name}
        onChange={(e) => formik.setFieldValue('name', e.target.value)}
      />
      <Input
        label='Địa chỉ'
        value={formik.values.address}
        onChange={(e) => formik.setFieldValue('address', e.target.value)}
      />
      <Input
        label='Mô tả '
        value={formik.values.description}
        onChange={(e) => formik.setFieldValue('description', e.target.value)}
      />
      <div className='text-right '>
        <Button className='mr-2' onClick={() => formik.handleSubmit()}>
          {isEdit ? 'Sửa' : 'Thêm'}
        </Button>
        <Button
          type='primary'
          danger
          onClick={() => navigate('/admin/warehouse')}
        >
          Huỷ bỏ
        </Button>
      </div>
    </div>
  );
};

export default UpsertWarehouse;
