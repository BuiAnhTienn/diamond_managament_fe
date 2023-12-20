import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import useConfirmModal from '@hooks/useConfirmModal';
import { ICategory } from '@interfaces/category.interface';
import { deleteCategory, getCategory } from '@services/category.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface DataType extends ICategory {}

const ServiceCategory = () => {
  const navigate = useNavigate();
  const { showConfirmModal } = useConfirmModal();
  const { data, refetch } = useQuery(['category'], getCategory);

  const { mutate: deleteCategoryMutate } = useMutation(deleteCategory, {
    onSuccess: () => {
      toast.success(`Xoá danh mục thành công!`);
      refetch();
    },
    onError: () => {
      toast.error('Có lỗi xảy ra');
    },
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '20%',
      render: (text, record) => (
        <Space size='middle'>
          <Button
            type='primary'
            className='text-[14px]'
            onClick={() => handleEditCategory(record._id ?? ``)}
          >
            <EditOutlined /> Chỉnh sửa
          </Button>
          <Button
            type='primary'
            className='text-[14px]'
            danger
            onClick={() => handleDeleteCategory(record)}
          >
            <DeleteOutlined /> Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleEditCategory = (id: string) => {
    navigate(`/admin/upsert-category/${id}`);
  };

  const handleDeleteCategory = (record: ICategory) => {
    showConfirmModal({
      title: `Bạn có muốn xoá ${record.name}?`,
      onOk: () => {
        deleteCategoryMutate({ id: record._id ?? `` });
      },
      okText: 'OK',
      cancelText: 'Không',
    });
  };

  const handleAddCategory = () => {
    navigate(`/admin/upsert-category/`);
  };

  return (
    <div>
      <Typography.Title level={2}>Quản lý danh mục</Typography.Title>
      <div className='mb-4 text-right'>
        <Button onClick={handleAddCategory}>
          <PlusCircleOutlined />
          Thêm
        </Button>
      </div>

      <Table columns={columns} dataSource={data ?? []} rowKey={'_id'} />
    </div>
  );
};

export default ServiceCategory;
