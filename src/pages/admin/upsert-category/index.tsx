import Input from '@components/Input';
import Button from '@components/Button';
import {
  createCategory,
  editCategory,
  getCategoryById,
} from '@services/category.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpsertCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { data: category } = useQuery(
    ['category', id],
    () => getCategoryById(id ?? ``),
    {
      enabled: isEdit,
    }
  );

  const { mutate: createCategoryMutate } = useMutation(createCategory, {
    onSuccess: () => {
      toast.success(`Thêm danh mục thành công`);
      navigate('/admin/category');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra');
    },
  });

  const { mutate: editCategoryMutate } = useMutation(editCategory, {
    onSuccess: () => {
      toast.success(`Sửa danh mục thành công!`);
      navigate('/admin/category');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra');
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    async onSubmit(values) {
      if (isEdit) {
        editCategoryMutate({ id: id ?? ``, name: values.name });
      } else {
        createCategoryMutate(values);
      }
    },
  });

  useEffect(() => {
    if (isEdit) {
      formik.setFieldValue('name', category?.name);
    }
  }, [category]);

  return (
    <div className='flex flex-col p-2 gap-4'>
      <Input
        label='Tên danh mục'
        value={formik.values.name}
        onChange={(e) => formik.setFieldValue('name', e.target.value)}
      />
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

export default UpsertCategory;
