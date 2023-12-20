// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Button from '@components/Button';
import Input from '@components/Input';
import { getCategory } from '@services/category.service';
import {
  createSubCategory,
  getSubcateById,
  updateSubCategory,
} from '@services/sub-category.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Select, Typography } from 'antd';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpsertSubCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { data: subCateData } = useQuery(
    ['sub-category', id],
    () => getSubcateById(id ?? ``),
    {
      enabled: isEdit,
    }
  );

  const { data: categoryList } = useQuery(
    ['categories'],
    () => getCategory(),
    {}
  );

  const { mutate: createSubCategoryMutate } = useMutation(createSubCategory, {
    onSuccess: () => {
      toast.success(`Thêm phụ mục thành công!`);
      navigate('/admin/sub-category');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra');
    },
  });

  const { mutate: editCategoryMutate } = useMutation(updateSubCategory, {
    onSuccess: () => {
      toast.success(`Sửa phụ mục thành công!`);
      navigate('/admin/sub-category');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra');
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
    },
    async onSubmit(values) {
      if (isEdit) {
        editCategoryMutate({ id: id ?? ``, subcate: values });
      } else {
        createSubCategoryMutate(values);
      }
    },
  });

  useEffect(() => {
    if (isEdit) {
      formik.setFieldValue('name', subCateData?.name);
      formik.setFieldValue('category', subCateData?.category);
    }
  }, [subCateData]);

  return (
    <div className='flex flex-col p-2 gap-4'>
      <Typography.Title level={3}>
        {isEdit ? 'Chỉnh sửa' : 'Thêm'} phụ mục
      </Typography.Title>
      <Input
        label='Tên phụ mục'
        value={formik.values.name}
        onChange={(e) => formik.setFieldValue('name', e.target.value)}
      />
      <div>
        <div className='mb-2'>Danh mục:</div>
        <Select
          options={categoryList?.map((item) => ({
            value: item?._id,
            label: item?.name,
          }))}
          className='w-full'
          placeholder='Vui lòng chọn danh mục'
          value={formik.values.category}
          onChange={(value) => formik.setFieldValue('category', value)}
        ></Select>
      </div>
      <div className='text-right '>
        <Button className='mr-2' onClick={() => formik.handleSubmit()}>
          {isEdit ? 'Sửa' : 'Thêm'}
        </Button>
        <Button
          type='primary'
          danger
          onClick={() => navigate('/admin/category')}
        >
          Huỷ bỏ
        </Button>
      </div>
    </div>
  );
};

export default UpsertSubCategory;
