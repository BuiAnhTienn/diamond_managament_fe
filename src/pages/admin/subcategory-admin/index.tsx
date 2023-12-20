// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import Button from '@components/Button';
import useConfirmModal from '@hooks/useConfirmModal';
import { ICategory } from '@interfaces/category.interface';
import { GetQuery } from '@interfaces/getQuery';
import { ISubCategory } from '@interfaces/ISubCategory';
import {
  deleleSubCategories,
  getSubCategoryListAdmin,
} from '@services/sub-category.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Typography from 'antd/es/typography/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SubCategoryList = () => {
  const [paging, setPaging] = useState<GetQuery>({
    page: 1,
    pageSize: 10,
    totalItem: 0,
  });

  const navigate = useNavigate();
  const query = useQueryClient();
  const { showConfirmModal } = useConfirmModal();
  const { data, isFetching } = useQuery(
    ['sub-category', paging],
    async () => {
      const result = await getSubCategoryListAdmin(paging);
      setPaging((prevPaging) => ({
        ...prevPaging,
        totalItem: result?.total,
      }));
      return result?.docs;
    },
    { refetchOnWindowFocus: false }
  );

  const handleDeleteSubCategory = async (id: string) => {
    try {
      const result = await deleleSubCategories(id);
      if (result) {
        toast.success('Xoá phụ mục thành công!');
        query.invalidateQueries(['sub-category']);
      }
    } catch (error) {
      toast('Có gì đó đang sai!');
    }
  };

  const columns: ColumnsType<ISubCategory> = [
    {
      title: 'Tên',
      dataIndex: 'name',
    },
    {
      title: 'Loại chính',
      dataIndex: 'category',
      render: (category: ICategory) => {
        return <div>{category?.name}</div>;
      },
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
            onClick={() => {
              navigate(`/admin/upsert-sub-category/${record?._id}`);
            }}
          >
            <EditOutlined /> Chỉnh sửa
          </Button>
          <Button
            type='primary'
            className=' text-[14px]'
            danger
            onClick={() => {
              showConfirmModal({
                title: `Bạn có muốn xoá phụ lục ${record.name} này không ?`,
                onOk: () => handleDeleteSubCategory(record?._id ?? ``),
                cancelText: 'Không',
              });
            }}
          >
            <DeleteOutlined /> Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (page: number, pageSize: number) => {
    setPaging((prev) => ({ ...prev, page, pageSize }));
  };

  return (
    <div>
      <Typography.Title level={2}>Quản lý phụ mục</Typography.Title>
      <div className='mb-4 text-right'>
        <Button onClick={() => navigate(`/admin/upsert-sub-category/`)}>
          <PlusCircleOutlined />
          Thêm
        </Button>
      </div>

      <Table
        loading={isFetching}
        columns={columns}
        dataSource={data ?? []}
        rowKey={'_id'}
        pagination={{
          total: paging.totalItem,
          current: paging.page,
          pageSize: paging.pageSize,
          onChange: (page, pageSize) => {
            handleTableChange(page, pageSize);
          },
        }}
      />
    </div>
  );
};

export default SubCategoryList;
