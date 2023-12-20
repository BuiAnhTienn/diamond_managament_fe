// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Input from "@components/Input";
import Button from "@components/Button";
import useConfirmModal from "@hooks/useConfirmModal";
import { GetQuery } from "@interfaces/getQuery";
import { IProduct } from "@interfaces/product.interface";
import { deteleProduct, getProduct } from "@services/product.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import formatCurrency from "@utils/formatCurrency";
import { Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";

interface DataType extends IProduct {}

const ProductAdmin = () => {
  const [paging, setPaging] = useState<GetQuery>({
    page: 1,
    pageSize: 10,
    totalItem: 0,
  });
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue] = useDebounce(inputValue, 700);
  const navigate = useNavigate();
  const { showConfirmModal } = useConfirmModal();
  const { data, isFetching, refetch } = useQuery(
    ["product", paging, debouncedValue],
    async () => {
      const result = await getProduct({ ...paging, search: debouncedValue });
      setPaging((prevPaging) => ({
        ...prevPaging,
        totalItem: result?.total,
      }));
      return result?.docs;
    },
    { refetchOnWindowFocus: false }
  );

  const { mutate: deleteProductMutate } = useMutation(deteleProduct, {
    onSuccess: () => {
      toast.success(`Xoá sản phẩm thành công!`);
      if (paging.page === 1) {
        refetch();
      } else {
        setPaging((prevPaging) => ({
          ...prevPaging,
          page: 1,
        }));
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price: number) => <div>{formatCurrency(price)}</div>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: "25%",
      render: (description: string) => (
        <div
          className="h-[100px] overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      ),
    },
    {
      title: <p className="text-center">Xu hướng</p>,
      width: "10%",
      dataIndex: "isTrending",
      render: (isTrending: boolean) => (
        <div className="text-center">{isTrending ? "Có" : "Không"}</div>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      width: "20%",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="text-[14px]"
            onClick={() => handleEditProduct(record._id)}
          >
            <EditOutlined /> Chỉnh sửa
          </Button>
          <Button
            type="primary"
            className="text-[14px]"
            danger
            onClick={() => handleDeleteProduct(record)}
          >
            <DeleteOutlined /> Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleEditProduct = (id: string) => {
    navigate(`/admin/upsert-product/${id}`);
  };

  const handleDeleteProduct = (record: IProduct) => {
    showConfirmModal({
      title: `Bạn có muốn xoá ${record.name}?`,
      onOk: () => {
        deleteProductMutate({ id: record._id });
      },
      okText: "OK",
      cancelText: "Không",
    });
  };

  const handleAddProduct = () => {
    navigate(`/admin/upsert-product/`);
  };

  const handleTableChange = (page: number, pageSize: number) => {
    setPaging((prev) => ({ ...prev, page, pageSize }));
  };

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <Typography.Title level={2}>Quản lý sản phẩm</Typography.Title>
      <div className="flex my-2 gap-2">
        <Input
          placeholder="Tìm kiếm"
          onChange={handleChangeSearchValue}
          value={inputValue}
        ></Input>
      </div>
      <div className="mb-4 text-right">
        <Button onClick={handleAddProduct}>
          <PlusCircleOutlined />
          Thêm
        </Button>
      </div>

      <Table
        loading={isFetching}
        columns={columns}
        dataSource={data ?? []}
        rowKey={"_id"}
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

export default ProductAdmin;
