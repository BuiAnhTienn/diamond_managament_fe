import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import useConfirmModal from '@hooks/useConfirmModal';
import { GetQuery } from '@interfaces/getQuery';
import { ISubCategory } from '@interfaces/ISubCategory';
import { deleleSubCategories } from '@services/sub-category.service';
import { deleteWarehouse, getWareHouse } from '@services/warehouse.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Warehouse = () => {
  const [paging, setPaging] = useState<GetQuery>({
    page: 1,
    pageSize: 10,
    totalItem: 0,
  });

  const navigate = useNavigate();
  const query = useQueryClient();
  const { showConfirmModal } = useConfirmModal();
  const { data, isFetching } = useQuery(
    ['warehouse', paging],
    async () => {
      const result = await getWareHouse(paging);
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
      const result = await deleteWarehouse(id);
      if (result) {
        toast.success('Xoá kho thành công thành công!');
        query.invalidateQueries(['warehouse']);
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
      title: 'Địa chỉ',
      dataIndex: 'address',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
    },
    {
      title: 'Hành động',
      key: 'actions',
      align: 'center',
      width: '20%',
      render: (text, record) => (
        <Space size='middle'>
          <Button
            type='primary'
            onClick={() => {
              navigate(`/admin/upsert-product-in-warehouse/${record?._id}`);
            }}
            className='bg-[#45A448] text-white text-[14px] hover:!bg-[#45a448]'
          >
            <EditOutlined /> Cập nhật sản phẩm
          </Button>
          <Button
            type='primary'
            onClick={() => {
              navigate(`/admin/upsert-warehouse/${record?._id}`);
            }}
            className='text-[14px]'
          >
            <EditOutlined /> Chỉnh sửa
          </Button>
          <Button
            type='primary'
            danger
            onClick={() => {
              showConfirmModal({
                title: `Bạn có muốn xoá phụ lục ${record.name} này không ?`,
                onOk: () => handleDeleteSubCategory(record?._id ?? ``),
                cancelText: 'Không',
              });
            }}
            className='text-[14px]'
          >
            <DeleteOutlined /> Xoá
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
      <Typography.Title level={2}>Quản lý kho</Typography.Title>
      <div className='mb-4 text-right'>
        <Button onClick={() => navigate(`/admin/upsert-warehouse/`)}>
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

export default Warehouse;
