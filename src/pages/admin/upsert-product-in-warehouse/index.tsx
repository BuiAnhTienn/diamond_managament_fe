// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Button from "@components/Button";
import Input from "@components/Input";
import Select from "@components/Select";
import useConfirmModal from "@hooks/useConfirmModal";
import { IProductInWarehouse } from "@interfaces/IWareHouseWithProduct";
import { getProduct } from "@services/product.service";
import {
  addProductToWarehouse,
  deleteProductInWarehouse,
  getProductsInWarehouse,
  getWareHouseById,
  IProductInWarehouseQuery,
} from "@services/warehouse.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import formatCurrency from "@utils/formatCurrency";
import { Modal, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpsertProductInWarehouse = () => {
  const navigate = useNavigate();
  const { showConfirmModal } = useConfirmModal();

  const [paging, setPaging] = useState<IProductInWarehouseQuery>({
    page: 1,
    pageSize: 10,
    totalItem: 0,
  });
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const { id } = useParams();

  const addFormik = useFormik({
    initialValues: {
      product: "",
      quantity: 0,
    },
    async onSubmit(values) {
      const payload = {
        product: values.product,
        quantity: +values.quantity,
        warehouse: id ?? ``,
      };
      addProductToWarehouseMutate(payload);
    },
  });

  const editFormik = useFormik({
    initialValues: {
      product: "",
      quantity: 0,
    },
    async onSubmit(values) {
      const payload = {
        product: values.product,
        quantity: +values.quantity,
        warehouse: id ?? ``,
      };
      addProductToWarehouseMutate(payload);
    },
  });

  const { data, isFetching, refetch } = useQuery(
    ["get-product-in-warehouse", id, paging],
    async () => {
      const result = await getProductsInWarehouse({ ...paging, warehouse: id });
      setPaging((prevPaging) => ({
        ...prevPaging,
        totalItem: result?.total,
      }));
      return result?.docs;
    },
    { refetchOnWindowFocus: false }
  );

  const { data: warehouseData } = useQuery(
    ["warehouse-by-id", id],
    () => getWareHouseById(id ?? ``),
    { refetchOnWindowFocus: false }
  );

  const { data: productData } = useQuery(["products"], () =>
    getProduct({ pageSize: 999, page: 1 })
  );

  const { mutate: addProductToWarehouseMutate } = useMutation(
    addProductToWarehouse,
    {
      onSuccess: () => {
        toast.success("Cập nhật kho hàng thành công");
        setOpenAddModal(false);
        setOpenEditModal(false);
        refetch();
      },
      onError: () => {
        toast.success("Có gì đó đang sai!");
      },
    }
  );

  const { mutate: deleteProductMutate } = useMutation(
    deleteProductInWarehouse,
    {
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
    }
  );

  const columns: ColumnsType<IProductInWarehouse> = [
    {
      title: "Tên",
      render: (record: IProductInWarehouse) => {
        return <div>{record?.product?.name}</div>;
      },
    },
    {
      title: <p className="text-center">Giá</p>,
      className: "text-end",
      render: (record: IProductInWarehouse) => {
        return <div>{formatCurrency(record?.product?.price)}</div>;
      },
    },
    {
      title: <p className="text-center">Ảnh</p>,
      className: "text-center",
      render: (record: IProductInWarehouse) => {
        return (
          <div className="w-[100px] h-[100px]">
            <img
              alt=""
              src={record?.product?.image?.[0]}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        );
      },
    },
    {
      title: "Số lượng",
      width: "8%",
      className: "text-center",
      render: (record: IProductInWarehouse) => {
        return <div>{record.quantity}</div>;
      },
    },
    {
      title: <p className="text-center">Hành động</p>,
      key: "actions",
      width: "20%",
      render: (record: IProductInWarehouse) => (
        <Space size="middle">
          <Button
            type="primary"
            className="text-[14px]"
            onClick={() => {
              editFormik.setFieldValue("product", record?.product?._id);
              editFormik.setFieldValue("quantity", record?.quantity);
              setOpenEditModal(true);
            }}
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

  const handleTableChange = (page: number, pageSize: number) => {
    setPaging((prev) => ({ ...prev, page, pageSize }));
  };

  const handleDeleteProduct = (record: IProductInWarehouse) => {
    showConfirmModal({
      title: `Bạn có muốn xoá ${record.product.name}?`,
      onOk: () => {
        deleteProductMutate({ productId: record._id, warehouseId: id });
      },
      okText: "OK",
      cancelText: "Không",
    });
  };

  return (
    <div>
      <Typography.Title level={2}>
        Quản lý sản phẩm trong{" "}
        <span style={{ color: "blue" }}>{warehouseData?.name}</span>
      </Typography.Title>
      <div className="flex justify-between mb-4">
        <Button onClick={() => navigate("/admin/warehouse")}>Quay lại</Button>
        <Button
          onClick={() => {
            setOpenAddModal(true);
          }}
        >
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
      <Modal
        open={openAddModal}
        onCancel={() => {
          setOpenAddModal(false);
          addFormik.resetForm();
        }}
        title="Thêm sản phẩm"
        okText="Thêm"
        cancelText="Huỷ bỏ"
        onOk={() => {
          addFormik.handleSubmit();
        }}
      >
        <Select
          label="Chọn sản phẩm:"
          showSearch
          options={productData?.docs?.map((item) => ({
            value: item._id,
            label: item.name,
          }))}
          filterOption={(input, option) =>
            option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={(value) => {
            addFormik.setFieldValue("product", value);
          }}
          value={addFormik.values.product}
        ></Select>

        <Input
          type="number"
          label="Số lượng:"
          onChange={(e) => {
            if (e.target.value >= 0) {
              addFormik.setFieldValue("quantity", e.target.value);
            }
          }}
          value={addFormik.values.quantity}
        />
      </Modal>
      <Modal
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        title="Cập nhật số lượng"
        okText="Cập nhật"
        cancelText="Huỷ bỏ"
        onOk={() => {
          editFormik.handleSubmit();
        }}
      >
        <Select
          label="Sản phẩm:"
          showSearch
          options={productData?.docs?.map((item) => ({
            value: item._id,
            label: item.name,
          }))}
          filterOption={(input, option) =>
            option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={(value) => {
            editFormik.setFieldValue("product", value);
          }}
          value={editFormik.values.product}
          disabled
        ></Select>

        <Input
          type="number"
          label="Số lượng:"
          onChange={(e) => {
            if (e.target.value >= 0) {
              editFormik.setFieldValue("quantity", e.target.value);
            }
          }}
          value={editFormik.values.quantity}
        />
      </Modal>
    </div>
  );
};

export default UpsertProductInWarehouse;
